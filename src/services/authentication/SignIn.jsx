import { Hub } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import authenticationApi from 'store/models/authentication-store';
import studentApi from 'store/models/student-store';
import { Auth } from './AwsConfig';

export default function SignIn() {
  const [portalUser, setPortalUser] = useState(null);
  const [token, setToken] = useState('');

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

    getUser().then(async (userData) => {
      if (userData) {
        try {
          const payload = { idToken: userData.signInUserSession.idToken.jwtToken };
          const response = await authenticationApi.signIn(payload);
          setToken(response);
        } catch (error) {
          console.error(error);
        }
      }
      console.log('Data: ', userData);
      setPortalUser(userData);
    });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  }

  const getStudent = async () => {
    try {
      await studentApi.getStudentDetai({ token });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p>User: {portalUser ? JSON.stringify(portalUser.attributes) : 'None'}</p>
      {portalUser ? (
        <button onClick={() => Auth.signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => Auth.federatedSignIn()}>Federated Sign In</button>
      )}
      <button onClick={getStudent}>Get Student</button>
    </div>
  );
}
