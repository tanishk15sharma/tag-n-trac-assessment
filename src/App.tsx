import React from "react";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="dashboard" element={<CustomerDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
