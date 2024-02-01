import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './translations/i18n';
import LoginPage from './pages/Login/Login';
import { HomePage } from './pages/Home/Home';
import { setNavigate } from './services/Api';
import { OrdersPage } from './pages/Orders/Order';
import SchedulersPage from './pages/Schedulers/Schedulers';

const Root = () => {
	const navigate = useNavigate();
	setNavigate(navigate);
	return (
		<Routes>
			<Route path='/' element={<LoginPage />} />
			<Route path='/home' element={<HomePage />} />
			<Route path='/orders' element={<OrdersPage />} />
			<Route path='/schedulers' element={<SchedulersPage />} />
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
