import React, { useRef, useEffect } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import { LoginRouter } from '../routers';
import { UserProvider } from '../context';

import MainLayout from './Main';
import LoginLayout from './Login';

const isLoginRoute = () => !!LoginRouter.find(route => useMatch(route.path));

const Layout = () => {
  const componentRef = useRef(null);
  const location = useLocation();
  const isLoginPage = isLoginRoute(location.pathname);

  // scroll top on page navigation
  useEffect(() => {
    if (componentRef?.current?.scrollIntoView)
      componentRef?.current?.scrollIntoView();
  }, [location]);

  return (
    <>
      {isLoginPage ? (
        <LoginLayout />
      ) : (
        <UserProvider>
          <MainLayout componentRef={componentRef} />
        </UserProvider>
      )}
    </>
  );
};

export default Layout;
