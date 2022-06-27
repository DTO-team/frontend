/* eslint-disable no-use-before-define */
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

import Amplify, { Auth } from 'aws-amplify';
import { createContext, ReactNode, useCallback, useEffect, useReducer } from 'react';
// @types
import { AccountSession } from '../@types/account';
import { ActionMap, AuthState, AuthUser, AWSCognitoContextType } from '../@types/authentication';
//
import { awsConfig } from '../config';
// utils
import { useDispatch } from 'react-redux';
import { getSemesterList, setSelectedSemester } from 'redux/slices/management';
import { currentSemester } from 'utils/currentSemester';
import axios from '../utils/axios';

// ----------------------------------------------------------------------

// CAUTION: User Cognito is slily difference from firebase, so be sure to read the doc carefully.

Amplify.configure(awsConfig);

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

enum Types {
  auth = 'AUTHENTICATE',
  logout = 'LOGOUT'
}

type AwsAuthPayload = {
  [Types.auth]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.logout]: undefined;
};

type AwsActions = ActionMap<AwsAuthPayload>[keyof ActionMap<AwsAuthPayload>];

const reducer = (state: AuthState, action: AwsActions) => {
  if (action.type === 'AUTHENTICATE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
  return state;
};

const AuthContext = createContext<AWSCognitoContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const rootStoreDispatch = useDispatch();

  /* const getUserAttributes = useCallback(
    (currentUser: CognitoUser): Record<string, any> =>
      new Promise((resolve, reject) => {
        currentUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
          } else {
            const results: Record<string, any> = {};

            attributes?.forEach((attribute) => {
              results[attribute.Name] = attribute.Value;
            });
            resolve(results);
          }
        });
      }),
    []
  ); */

  const getSession = useCallback(async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      await Auth.currentSession()
        .then(async (session) => {
          if (!state.isAuthenticated) {
            try {
              const response: AccountSession = await axios.post('v1/auth/login', {
                idToken: session.getIdToken().getJwtToken()
              });
              const userAttribute = {
                id: response.id,
                displayName: response.fullName,
                role: response.role,
                statusId: response.statusId,
                email: response.email
              };
              dispatch({
                type: Types.auth,
                payload: { isAuthenticated: true, user: userAttribute }
              });
              axios.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`;

              if (!sessionStorage.getItem('currentSemester')) {
                const semesterResponse = await getSemesterList();
                const currentSemesterData = currentSemester(semesterResponse);
                sessionStorage.setItem('currentSemester', JSON.stringify(currentSemesterData));
                axios.defaults.headers.common['currentSemester'] =
                  sessionStorage.getItem('currentSemester');
                rootStoreDispatch(setSelectedSemester(currentSemesterData));
              } else {
                axios.defaults.headers.common['currentSemester'] =
                  sessionStorage.getItem('currentSemester');
                await getSemesterList();
                rootStoreDispatch(setSelectedSemester(JSON.parse(sessionStorage.currentSemester)));
              }
            } catch (error) {
              console.log('Failed to get session: ', error);
              dispatch({
                type: Types.auth,
                payload: {
                  isAuthenticated: false,
                  user: null
                }
              });
            }
          }
          // use the token or Bearer depend on the wait BE handle, by default amplify API only need to token.
        })
        .catch((err) => console.log('Get session failed: ', err));
      /* user.getSession(async (err: Error | null, session: CognitoUserSession | null) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            user,
            session,
            headers: { Authorization: token }
          });
        }
      }); */
    } else {
      dispatch({
        type: Types.auth,
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  }, [state.isAuthenticated, rootStoreDispatch]);

  const initial = useCallback(async () => {
    try {
      await getSession();
    } catch {
      dispatch({
        type: Types.auth,
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  }, [getSession]);

  useEffect(() => {
    initial();
  }, [initial]);

  // We make sure to handle the user update here, but return the resolve value in order for our components to be
  // able to chain additional `.then()` logic. Additionally, we `.catch` the error and "enhance it" by providing
  // a message that our React components can use.
  const login = useCallback(
    (email, password) =>
      new Promise((resolve, reject) => {
        /* const user = new CognitoUser({
          Username: email,
          Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password
        });

        user.authenticateUser(authDetails, {
          onSuccess: (data) => {
            getSession();
            resolve(data);
          },
          onFailure: (err) => {
            reject(err);
          },
          newPasswordRequired: () => {
            // Handle this on login page for update password.
            resolve({ message: 'newPasswordRequired' });
          }
        }); */
      }),
    []
  );

  const loginWithGoogle = () => {
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  };

  // same thing here
  const logout = async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      Auth.signOut();
      sessionStorage.clear();
      dispatch({ type: Types.logout });
    }
  };

  const register = (email: string, password: string, firstName: string, lastName: string) =>
    new Promise((resolve, reject) => {
      /* UserPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'name', Value: `${firstName} ${lastName}` })
        ],
        [],
        async (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(undefined);
          window.location.href = PATH_AUTH.login;
        }
      ); */
    });

  const resetPassword = (email: string) => console.log(email);

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'cognito',
        user: {
          id: state?.user?.id || '',
          displayName: state?.user?.displayName || 'Minimals',
          role: state?.user?.role || 'admin',
          email: state?.user?.email || 'admin@gmail.com',
          statusId: state?.user?.statusId || 0,
          ...state.user
        },
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
