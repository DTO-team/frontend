export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const awsConfig = {
  Auth: {
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL,
    region: process.env.REACT_APP_AWS_REGION,
    identityPoolRegion: process.env.REACT_APP_AWS_IDENTITY_POOL_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID,
    oauth: {
      domain: process.env.REACT_APP_OAUTH_DOMAIN,
      /* scope: ['email', 'profile', 'openid'], */
      redirectSignIn: process.env.REACT_APP_REDIRECT_URL,
      redirectSignOut: process.env.REACT_APP_REDIRECT_URL,
      /* clientId: '6d551tl4maj37hl6qt6fhd2mj1', */
      responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
};

export const auth0Config = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
};

export const mapConfig = process.env.REACT_APP_MAP_MAPBOX;

export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
