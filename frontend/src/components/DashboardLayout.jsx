import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getRoleHomeRoute } from '../utils/roleHomeRoute.js';

const DashboardLayout = ({ section, description, children }) => {
  const { currentUser, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const homeRoute = getRoleHomeRoute(currentUser);
  if (homeRoute !== location.pathname) {
    return <Navigate to={homeRoute} replace />;
  }

  return (
    <div className="min-h-screen w-full bg-[#f4f9f2]">
      <header className="border-b border-emerald-900/10 bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4m8-8a8 8 0 100 16 8 8 0 000-16z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold tracking-tight text-emerald-950">MedCare</p>
              <p className="text-xs text-slate-500">{section}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              logoutUser();
              navigate('/login', { replace: true });
            }}
            className="rounded-lg border border-emerald-900/15 px-4 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-9">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
            {section}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#13251b] sm:text-4xl">
            Welcome, {currentUser.fullName}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm shadow-emerald-950/5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Hospital ID</p>
            <p className="mt-2 font-mono text-sm font-semibold text-emerald-900">{currentUser.id}</p>
          </div>
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm shadow-emerald-950/5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</p>
            <p className="mt-2 break-all text-sm font-semibold text-slate-800">{currentUser.email}</p>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
