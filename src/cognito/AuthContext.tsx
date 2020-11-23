import React, {
  useContext
} from 'react';
import { CognitoUser } from "amazon-cognito-identity-js";

interface IAuthContext {
  signUp: (username, email, password) => Promise<CognitoUser | undefined>;
  confirmSignUp: (username, code) => Promise<void>;
  signIn: (username, password) => Promise<void>;
  changePassword: (oldPassword, newPassword) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isNewPasswordRequired: boolean;
  isLoading: boolean;
  error?: any;
  user?: CognitoUser;
};

const stub = () => {};
const initialContext = {
  signUp: stub,
  confirmSignUp: stub,
  signIn: stub,
  changePassword: stub,
  signOut: stub,
  isAuthenticated: false,
  isNewPasswordRequired: false,
  isLoading: false,
};
export const AuthContext = React.createContext<IAuthContext>(initialContext);
export const useAuth = () => useContext(AuthContext);
