import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layout/AuthLayout.jsx';
import Register from '../pages/Auth/Register.jsx';

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
]);
