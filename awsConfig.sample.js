const aws_config = {
  Auth: {
    userPoolId: 'ap-northeast-1_1234ABCDE',
    userPoolWebClientId: '123456789abcdefghijklmnopq',
    region: 'ap-northeast-1',
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
};

export default aws_config;
