import React from "react";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
