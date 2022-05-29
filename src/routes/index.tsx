import Dashboard from 'pages/Dashboard/Dashboard';
import Welcome from 'pages/Welcome/Welcome';
import type { RouteObject } from 'react-router-dom';
import SignIn from 'services/authentication/SignIn';
import SignUp from 'services/authentication/SignUp';
import UserTemplate from 'Templates/UserTemplate';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <UserTemplate />,
    children: [
      { index: true, element: <Welcome /> },
      {
        path: '/home',
        element: <Dashboard />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <SignIn />,
      },
    ],
  },
];
