const AuthSideBar = () => {
  return (
    <aside
      className="relative hidden min-h-screen overflow-hidden bg-cover bg-center text-white lg:flex lg:w-1/2 lg:shrink-0 lg:flex-col lg:justify-between lg:p-10 xl:p-14"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(10, 34, 24, 0.12) 0%, rgba(10, 34, 24, 0.18) 42%, rgba(10, 34, 24, 0.86) 100%), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85')",
      }}
    >
      <div className="absolute inset-0 bg-emerald-950/10" />
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/60 bg-white text-emerald-900 shadow-lg">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4m8-8a8 8 0 100 16 8 8 0 000-16z" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-semibold tracking-tight text-white">MedCare</p>
          <p className="text-xs text-white/75">Care operations, in balance</p>
        </div>
      </div>

      <div className="relative z-10 max-w-xl pb-2">
        <p className="mb-5 flex items-center gap-2 text-sm font-medium text-white/90">
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          For the people who care
        </p>
        <h2 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
          A calmer center for every shift.
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-white/85">
          Bring every team, room, and daily detail into a steadier rhythm of care.
        </p>
      </div>
    </aside>
  );
};

export default AuthSideBar;
