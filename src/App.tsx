import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './translations/i18n';
import LoginPage from './pages/Login/Login';
import { HomePage } from './pages/Home/Home';
import { setNavigate } from './services/Api';
import SchedulersPage from './pages/Schedulers/Schedulers';
import RoutePermissionwithRBAC from './common/Permission/RoutePermission';
import { UserRole } from './utils/common';
import { OrdersPage } from './pages/Orders/Orders';
import { OrderDetail } from './pages/OrderDetail/OrderDetail';
import { Products } from './pages/Products/Products';
import { Customers } from './pages/Customers/Customers';
import { SalesExecutive } from './pages/SalesExecutive/SalesExecutive';

const Root = () => {
  const navigate = useNavigate();
  setNavigate(navigate);
  const SchedulersRouteWithRBAC = RoutePermissionwithRBAC([UserRole.ADMINHO])(
    SchedulersPage
  );
  const SalesExecutiveWithRBAC = RoutePermissionwithRBAC([UserRole.ADMINHO])(
    SalesExecutive
  );
  return (
    <Routes>
      <Route
        path='/'
        element={<LoginPage />}
      />
      <Route
        path='/home'
        element={<HomePage />}
      />
      <Route
        path='/orders'
        element={<OrdersPage />}
      />
      <Route
        path='/schedulers'
        element={<SchedulersRouteWithRBAC />}
      />
      <Route
        path='/order/:id'
        element={<OrderDetail />}
      />
      <Route
        path='/products'
        element={<Products />}
      />
      <Route
        path='/customers'
        element={<Customers />}></Route>
      <Route
        path='/sales_executive'
        element={<SalesExecutiveWithRBAC />}
      />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
};

export default App;
