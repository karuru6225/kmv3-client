import React , {
  useState,
  useEffect,
  ReactNode
} from 'react';
import { SignUpParams } from "@aws-amplify/auth/lib-esm/types";
import { CognitoUser } from "amazon-cognito-identity-js";
import Amplify, {
  Auth
} from "aws-amplify";
import { AuthContext } from './AuthContext';

export interface ICognitoAuthProviderParams {
  awsConfig: {
    Auth: {
      userPoolId: string;
      userPoolWebClientId: string;
      region: string;
    };
  };
  chidlren: ReactNode;
};

export default (props: ICognitoAuthProviderParams) => {
  const awsAuthConfig = {
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    ...props.awsConfig.Auth
  };

  Amplify.configure({
    Auth: awsAuthConfig
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewPasswordRequired, setIsNewPasswordRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkCurrentAuthenticatedUser();
  }, []);

  const checkCurrentAuthenticatedUser = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
  };

  const signUp = async (username, email, password): Promise<CognitoUser | undefined> => {
    setIsLoading(true);
    setError(null);
    let result;
    try {
      const params = {
        username,
        password,
        attributes: {
          email
        }
      };
      result = await Auth.signUp(params);
      setUser(result.user);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
    return result?.user;
  };

  const confirmSignUp = async (username, code): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await Auth.confirmSignUp(username, code);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  };
  const signIn = async (username, password): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await Auth.signIn(username, password);
      await checkCurrentAuthenticatedUser();
    } catch (e) {
      setError(e);
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
  };

  const changePassword = async (oldPassword, newPassword): Promise<void>  => {
    throw new Error('not implemented');
  };

  const signOut = async (): Promise<void>  => {
    await Auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        confirmSignUp,
        signIn,
        changePassword,
        signOut,
        isAuthenticated,
        isNewPasswordRequired,
        isLoading,
        error,
        user,
      }}
    >
      { props.children }
    </AuthContext.Provider>
  );
};
