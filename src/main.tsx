import React from 'react';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  createStackNavigator
} from '@react-navigation/stack';

import { useAuth } from './cognito/AuthContext';
import Pages from './pages';
import SignUp from './pages/signUp';
import ConfirmSignUp from './pages/confirmSignUp';
import Login from './pages/login';
import Home from './pages/home';

const Stack = createStackNavigator();
const transitionConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default () => {
  const {
    isAuthenticated
  } = useAuth();
  console.log('main', {
    isAuthenticated
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Pages.Login}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name={Pages.Home}
              component={Home}
              options={{
                headerBackTitleVisible: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={Pages.Login}
              component={Login}
              options={{
                headerBackTitleVisible: false,
                transitionSpec: {
                  open: transitionConfig,
                  close: transitionConfig,
                }
              }}
            />
            <Stack.Screen
              name={Pages.SignUp}
              component={SignUp}
              options={{
                headerBackTitleVisible: false,
                transitionSpec: {
                  open: transitionConfig,
                  close: transitionConfig,
                }
              }}
            />
            <Stack.Screen
              name={Pages.ConfirmSignUp}
              component={ConfirmSignUp}
              options={{
                headerBackTitleVisible: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
