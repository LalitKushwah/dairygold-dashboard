import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './translations/i18n';
import LoginPage from './pages/Login/Login';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
