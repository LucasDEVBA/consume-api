import React from 'react';
import { UseSelector, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Student from '../pages/Student';
import Students from '../pages/Students';
import Register from '../pages/Register';
import Files from '../pages/Files';
import Page404 from '../pages/Page404';

export default function Router() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Students />} />
      <Route path="/student/:id/edit" element={isLoggedIn ? <Student /> : <Login />} />
      <Route path="/student/" element={<Student />} />
      <Route path="/files/:id" element={isLoggedIn ? <Files /> : <Login />} />
      <Route path="/register/" element={isLoggedIn ? <Register /> : <Login />} />
      <Route path="/login/" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
