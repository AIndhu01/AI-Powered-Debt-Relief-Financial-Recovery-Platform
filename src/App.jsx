import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LoanForm from "./pages/LoanForm";
import LoanHistory from "./pages/LoanHistory";
import EditLoan from "./pages/EditLoan";
import Settlement from "./pages/Settlement";
import Profile from "./pages/Profile";

import Layout from "./components/Layout";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/loan"
        element={
          <ProtectedRoute>
            <Layout>
              <LoanForm />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/loan/edit/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <EditLoan />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <Layout>
              <LoanHistory />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settlement"
        element={
          <ProtectedRoute>
            <Layout>
              <Settlement />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;