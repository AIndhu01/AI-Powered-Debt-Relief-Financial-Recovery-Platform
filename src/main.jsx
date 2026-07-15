import React from "react";
import ReactDOM from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// Global CSS
import "./index.css";

// Authentication Context
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
  <App />
  <ToastContainer
    position="top-right"
    autoClose={3000}
    theme="colored"
  />
</AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);