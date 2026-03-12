// src/components/ProtectedRoute.jsx
// Se não tem token, redireciona para /login automaticamente.

import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/api';

export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
