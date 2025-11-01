import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import BookForm from './components/BookForm';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <div className="container" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/add-book" element={<PrivateRoute><BookForm /></PrivateRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
