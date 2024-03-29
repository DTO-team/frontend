import firebase from 'firebase/app';

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | {
  id: string;
  email?: string | null;
  displayName: string;
  role: string;
  statusId: number;
  photoURL?: string | null;
  avatarUrl?: string | null;
  phoneNumber?: string | null;
  country?: string | null;
  address?: string | null;
  state?: string | null;
  city?: string | null;
  zipCode?: string | null;
  about?: string | null;
  isPublic?: boolean | null;
  currentSemesterId?: string | null;
};

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'jwt';
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => void;
  updateProfile: VoidFunction;
};

export type FirebaseContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'firebase';
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  loginWithGoogle: () => Promise<firebase.auth.UserCredential>;
  loginWithFaceBook: () => Promise<firebase.auth.UserCredential>;
  loginWithTwitter: () => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: VoidFunction;
};

export type AWSCognitoContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'cognito';
  login: (email: string, password: string) => Promise<unknown>;
  loginWithGoogle: () => void;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<unknown>;
  logout: VoidFunction;
  resetPassword: (email: string) => void;
  updateProfile: VoidFunction;
};

export type Auth0ContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'auth0';
  login: () => Promise<void>;
  logout: VoidFunction;
  resetPassword: (email: string) => void;
  updateProfile: VoidFunction;
};
