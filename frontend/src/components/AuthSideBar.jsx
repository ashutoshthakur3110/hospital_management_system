import React from 'react';

const AuthSidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 lg:h-screen lg:sticky lg:top-0 lg:order-first items-center justify-center bg-gray-100 overflow-hidden">
      <img
        src="https://m.media-amazon.com/images/I/71291Go64OL._AC_UF894,1000_QL80_.jpg"
        alt="Authentication sidebar illustration"
        className="h-full w-full object-fill"
      />
    </div>
  );
};

export default AuthSidebar;
