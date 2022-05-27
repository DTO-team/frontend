import Report from 'pages/Report/Report';
import Home from 'pages/Home/Home';
import type { RouteObject } from 'react-router-dom';
import UserTemplate from 'Templates/UserTemplate';
import SignInSide from 'Templates/sign-in-side/SignInSide';
import SignUp from 'Templates/sign-up/SignUp';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <UserTemplate />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/report',
        element: <Report />,
      },
    ],
  },
  {
    path: '/login',
    element: <SignInSide />,
  },
  {
    path: '/register',
    element: <SignUp />,
  },
];
