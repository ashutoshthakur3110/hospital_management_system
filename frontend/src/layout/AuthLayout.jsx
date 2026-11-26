import { Outlet, useLocation } from 'react-router';
import AuthSideBar from '../components/AuthSideBar.jsx';

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isRegisterPage = pathname === '/';
  const isLoginPage = pathname === '/login';
  const isAuthPage = isRegisterPage || isLoginPage;

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-800 ${
        isAuthPage ? 'lg:h-screen lg:overflow-hidden' : ''
      }`}
    >
      {isAuthPage && <AuthSideBar />}
      <main
        className={`flex-1 min-w-0 overflow-y-auto ${
          isRegisterPage
            ? 'flex items-stretch p-0'
            : isLoginPage
              ? 'flex items-center justify-center bg-[#f4f9f2] p-4 sm:p-6 lg:p-10'
              : 'flex items-stretch bg-[#f4f9f2] p-0'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
