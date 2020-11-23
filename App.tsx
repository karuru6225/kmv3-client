import React from 'react';
import Main from './src/main';
import CognitoAuthProvider from './src/cognito/CognitoAuthProvider';
import awsConfig from './awsConfig';

export default () => (
  <CognitoAuthProvider awsConfig={awsConfig}>
    <Main />
  </CognitoAuthProvider>
);
