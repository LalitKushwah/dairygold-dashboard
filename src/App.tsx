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
import { Customers } from './pages/Customers/Customers';
import { SalesExecutive } from './pages/SalesExecutive/SalesExecutive';
import ProductCategories from './pages/ProductCategories/ProductCategories';
import { Holidays } from './pages/Holidays/Holidays';
import './common/Style/global.css';
import { PriceList } from './pages/Reports/PriceList/PriceList';

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
        path='/customers'
        element={<Customers />}
      />
      <Route
        path='/sales_executive'
        element={<SalesExecutiveWithRBAC />}
      />
      <Route
        path='/product_categories'
        element={<ProductCategories />}
      />
      <Route
        path='/holidays'
        element={<Holidays />}
      />
      <Route
        path='report/pricelist'
        element={<PriceList />}
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
