import React from 'react';

const AuthSideBar = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 text-white p-10 xl:p-14 flex-col justify-between relative overflow-hidden min-h-screen">

      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-teal-300 shadow-md">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            MedCare
          </h1>
          <p className="text-xs text-teal-200/80">Hospital Management System</p>
        </div>
      </div>

      {/* Middle Content */}
      <div className="relative z-10 my-auto py-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          Healthcare Management Platform
        </div>

        <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
          Streamlining hospital workflows & patient care.
        </h2>

        <p className="text-sm text-teal-100/80 leading-relaxed max-w-md">
          A unified system connecting doctors, patients, clinical staff, and pharmacies with real-time health records and scheduling.
        </p>

        {/* Feature Highlights */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-teal-400/20 flex items-center justify-center text-teal-300 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Centralized Medical Records</p>
              <p className="text-[11px] text-teal-200/70">Instant access to consultations, OPD notes & history</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-teal-400/20 flex items-center justify-center text-teal-300 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Pharmacy & Inventory Automation</p>
              <p className="text-[11px] text-teal-200/70">Live medicine stock tracking and rapid dispatch</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-xs text-teal-200/70 pt-6 border-t border-white/10">
        <span>24/7 Hospital Care</span>
      </div>
    </div>
  );
};

export default AuthSideBar;
