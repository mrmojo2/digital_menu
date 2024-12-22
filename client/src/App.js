import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Home, Login, ProtectedRoute, AdminDashboard } from './pages/';
import { useMyContext } from "./context/AppContext";
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin_login" element={<Login />} />

        {/* Protected Route */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

