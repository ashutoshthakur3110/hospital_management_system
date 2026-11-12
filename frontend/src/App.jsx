import React from 'react';
import { RouterProvider } from 'react-router';
import { AppRoutes } from './routes/app.routes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={AppRoutes} />
    </AuthProvider>
  );
};

export default App;
