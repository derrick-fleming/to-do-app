import React from 'react';
import Home from './pages/home';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigation-bar';
import LoginPage from './pages/accounts';

export default function App () {
    return (
      <>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<LoginPage page="signup"/>} />
          <Route path="/login" element={<LoginPage page="login"/>} />
        </Routes>
      </>
    );
}
