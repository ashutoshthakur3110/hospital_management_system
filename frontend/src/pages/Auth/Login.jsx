import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext.jsx';

const Login = () => {
  const { loginUser, currentUser, logoutUser, registeredUsers } = useAuth();

  const [selectedRole, setSelectedRole] = useState('patient');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [showAccountsDrawer, setShowAccountsDrawer] = useState(false);

  // Handle Login Evaluation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identifier.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter your registered email address or Hospital ID.',
      });
      return;
    }

    if (!password) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter your password.',
      });
      return;
    }

    // Evaluate credentials against Context
    const result = loginUser({
      identifier: identifier.trim(),
      password: password.trim(),
      role: selectedRole,
    });

    if (!result.success) {
      setStatusMessage({
        type: 'error',
        text: result.message,
      });
    } else {
      setStatusMessage({
        type: 'success',
        text: result.message,
      });
    }
  };

  // Quick auto-select a registered user from context for instant testing
  const handleQuickSelect = (user) => {
    setSelectedRole(user.role);
    setIdentifier(user.email);
    setPassword(user.password || 'Password@123');
    setStatusMessage({ type: '', text: '' });
  };

  // AUTHENTICATED ACTIVE SESSION VIEW
  if (currentUser) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-teal-50 border-4 border-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-100 text-teal-800 mb-2">
          Authenticated Session
        </span>

        <h2 className="text-2xl font-extrabold text-slate-800">
          Welcome, {currentUser.fullName}!
        </h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Logged in successfully as <strong className="capitalize text-teal-700">{currentUser.role}</strong>.
        </p>

        {/* Profile Card from Context */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 mb-6 text-sm">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">Hospital ID:</span>
            <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 text-xs">
              {currentUser.id}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Email:</span>
            <span className="text-slate-700 font-medium">{currentUser.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Phone:</span>
            <span className="text-slate-700">{currentUser.phone}</span>
          </div>
          {currentUser.bloodGroup && (
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Blood Group:</span>
              <span className="font-semibold text-slate-800">{currentUser.bloodGroup}</span>
            </div>
          )}
          {currentUser.specialization && (
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Specialty:</span>
              <span className="font-semibold capitalize text-teal-700">{currentUser.specialization}</span>
            </div>
          )}
          {currentUser.staffRole && (
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Department:</span>
              <span className="font-semibold capitalize text-teal-700">{currentUser.staffRole}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            logoutUser();
            setStatusMessage({ type: '', text: '' });
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
        >
          Sign Out / Switch Account
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-700 text-xs font-semibold mb-2">
          <svg className="w-3.5 h-3.5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V3a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Hospital Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Sign in to your hospital management portal.
        </p>
      </div>

      {/* Role Picker (UI) */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Sign In As
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'patient', label: 'Patient' },
            { id: 'doctor', label: 'Doctor' },
            { id: 'staff', label: 'Staff' },
          ].map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => {
                setSelectedRole(role.id);
                setStatusMessage({ type: '', text: '' });
              }}
              className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                selectedRole === role.id
                  ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm ring-2 ring-teal-500/20'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Alert */}
      {statusMessage.text && (
        <div
          className={`mb-4 p-3 rounded-xl border text-xs flex items-start gap-2 ${
            statusMessage.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}
        >
          {statusMessage.type === 'error' ? (
            <svg className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email or Hospital ID */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Email or Hospital ID
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (statusMessage.text) setStatusMessage({ type: '', text: '' });
              }}
              placeholder="e.g. name@hospital.org or MED-PT-100234"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-semibold text-slate-700">
              Password
            </label>
            <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-teal-600 hover:underline font-semibold">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (statusMessage.text) setStatusMessage({ type: '', text: '' });
              }}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
            />
            <span>Remember this device</span>
          </label>
        </div>

        {/* Sign In Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition cursor-pointer"
          >
            Sign In to {selectedRole === 'patient' ? 'Patient' : selectedRole === 'doctor' ? 'Doctor' : 'Staff'} Portal
          </button>
        </div>
      </form>

      {/* Context Registered Accounts Drawer (Testing Assistant) */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowAccountsDrawer(!showAccountsDrawer)}
          className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-teal-700 py-1 transition cursor-pointer"
        >
          <span className="font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            Registered Accounts in Context ({registeredUsers.length})
          </span>
          <span className="text-slate-400 font-mono text-[10px]">
            {showAccountsDrawer ? '▲ Hide' : '▼ Show'}
          </span>
        </button>

        {showAccountsDrawer && (
          <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-1">
            {registeredUsers.map((u) => (
              <div
                key={u.id || u.email}
                onClick={() => handleQuickSelect(u)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-teal-50/60 border border-slate-200/80 hover:border-teal-300 cursor-pointer transition text-left text-xs"
              >
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-semibold text-slate-800">{u.fullName}</span>
                  <span className="capitalize px-1.5 py-0.5 rounded text-[10px] bg-teal-100 text-teal-800 font-medium">
                    {u.role}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {u.email} • ID: <span className="font-mono">{u.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
        Don't have an account?{' '}
        <Link to="/" className="text-teal-600 hover:text-teal-700 font-bold hover:underline ml-1">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Login;
