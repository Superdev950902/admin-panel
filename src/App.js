import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login";
import MainUI from "./pages/main";
import Users from "./pages/User";
import Resigter from "./pages/Register";
import './App.css';

const App = () => {
  const [user, setUser] = useState(null); // Initialize as null

  useEffect(() => {
    const userSession = localStorage.getItem('user');
    if (userSession) {
      setUser(JSON.parse(userSession));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
  };

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/login" element={<Login loginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Resigter />} />
          <Route path="/" element={<ProtectedRoute><MainUI /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute ><Users /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute ><MainUI /></ProtectedRoute>} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </React.Fragment>
  );
};

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default App;