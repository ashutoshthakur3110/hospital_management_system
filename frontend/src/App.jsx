import React from 'react';
import { RouterProvider } from 'react-router';
import { AppRoutes } from './routes/app.routes.jsx';

const App = () => {
  return <RouterProvider router={AppRoutes} />;
};

export default App;