import Amplify, { Auth } from 'aws-amplify';

const awsconfig = {
  Auth: {
    identityPoolId: 'ap-southeast-1:18128b78-895f-41f5-b8c3-0d16978c2783',
    region: 'ap-southeast-1',
    identityPoolRegion: 'ap-southeast-1',
    userPoolId: 'ap-southeast-1_C4UYp8bPJ',
    userPoolWebClientId: '6d551tl4maj37hl6qt6fhd2mj1',
    oauth: {
      domain: 'fptu-capstone-management-dto.auth.ap-southeast-1.amazoncognito.com',
      /* scope: ['email', 'profile', 'openid'], */
      redirectSignIn: 'http://localhost:3000/login',
      redirectSignOut: 'http://localhost:3000/login',
      /* clientId: '6d551tl4maj37hl6qt6fhd2mj1', */
      responseType: 'token', // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
};
Amplify.configure(awsconfig);

export { Auth, awsconfig };
