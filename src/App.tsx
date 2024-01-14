import React from 'react';
import './App.css';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from 'react-router-dom';
import './translations/i18n';
import LoginPage from './pages/Login/Login';
import { HomePage } from './pages/Home/Home';
import { setNavigate } from './services/Api';

const Root = () => {
  const navigate = useNavigate();
  setNavigate(navigate);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/home',
      element: <HomePage />,
    },
  ]);
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
