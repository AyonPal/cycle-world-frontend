import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DataDetails from './components/SpotDetails';
import Header from './components/Header';
import Calculate from './components/Calculate';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Calculate />} />
        <Route path="/details/:name" element={<DataDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
