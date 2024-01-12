import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './translations/i18n';

const App = () => {
  const { t } = useTranslation();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>{t('note')}</div>,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
