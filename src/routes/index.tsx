import Report from 'pages/Report/Report';
import Home from 'pages/Home/Home';
import type { RouteObject } from 'react-router-dom';
import UserTemplate from 'Templates/UserTemplate';

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
];
