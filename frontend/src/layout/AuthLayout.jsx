import React from 'react';
import { Outlet } from 'react-router';
import AuthSideBar from '../components/AuthSideBar.jsx';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-800">
      <AuthSideBar />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
