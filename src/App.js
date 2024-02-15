import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignUp from './pages/register';
import LoginPre from './pages/login';
import Footer from './Components/Footer';
import HomePage from './pages/homePage';
import PropertyView from './pages/view property';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPre />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/property/:id" element={<PropertyView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;



