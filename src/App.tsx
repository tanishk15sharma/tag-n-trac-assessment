import React from "react";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { DeliveryPartnerDashboard } from "./pages/DeliveryPartnerDashboard";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { CustomerSignup } from "./pages/CustomerSignup";
import { DeliveryPartnerSignup } from "./pages/DeliveryPartnerSignup";
import { PageNotFound } from "./components/PageNotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route
              path="/delivery-dashboard"
              element={<DeliveryPartnerDashboard />}
            />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CustomerSignup />} />
          <Route path="/signup-partner" element={<DeliveryPartnerSignup />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
