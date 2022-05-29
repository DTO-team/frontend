import { Auth } from './AwsConfig';
import React, { useEffect, useState } from 'react';
import { Hub } from 'aws-amplify';

/* async function signIn({ username, password }) {
  try {
    const user = await Auth.signIn(username, password);
    console.log('logged in: ', user);
  } catch (error) {
    console.log('error signing in', error);
  }
} */

export default function SignIn() {
  const [portalUser, setPortalUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then((userData) => setPortalUser(userData));
          break;
        case 'signOut':
          setPortalUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
        default: {
        }
      }
    });

    getUser().then((userData) => {
      console.log('Data: ', userData);
      setPortalUser(userData);
    });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  }

  return (
    <div>
      <p>User: {portalUser ? JSON.stringify(portalUser.attributes) : 'None'}</p>
      {portalUser ? (
        <button onClick={() => Auth.signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => Auth.federatedSignIn()}>Federated Sign In</button>
      )}
    </div>
  );
}
