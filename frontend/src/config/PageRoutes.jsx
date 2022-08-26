import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import LoginPage from '../pages/LoginPage/LoginPage';
import AdminPage from '../pages/AdminPage/AdminPage';

const PageRoutes = () => {
  return (
    <Routes>
      <Route path='/:category/search/:keyword' element={<Catalog />} />
      <Route path='/:category/:id' element={<Detail />} />
      <Route path='/:category' element={<Catalog />} />
      <Route path='/login' exact element={<LoginPage />} />
      <Route path='/admin/:optitle' element={<AdminPage />} />
      <Route path='/' exact element={<Home />} />
    </Routes>
  );
};

export default PageRoutes;
