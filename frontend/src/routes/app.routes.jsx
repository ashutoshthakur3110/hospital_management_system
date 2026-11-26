import { createBrowserRouter } from 'react-router';
import AuthLayout from '../layout/AuthLayout.jsx';
import Register from '../pages/Auth/Register.jsx';
import Login from '../pages/Auth/Login.jsx';
import Patient from '../pages/Patient/Patient.jsx';
import Docter from '../pages/Docter/Docter.jsx';
import Hospital from '../pages/Hospital/Hospital.jsx';
import Medical from '../pages/Medical/Medical.jsx';

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/patient',
        element: <Patient />,
      },
      {
        path: '/doctor',
        element: <Docter />,
      },
      {
        path: '/hospital',
        element: <Hospital />,
      },
      {
        path: '/medical',
        element: <Medical />,
      },
    ],
  },
]);
