import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

// eslint-disable-next-line react/prop-types
function Private({ redirectTo }) {
  const isClosed = false;
  console.log('isAuth', isClosed);
  return isClosed ? <Login /> : <Navigate to={redirectTo} />;
}
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Private redirectTo="/" />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
