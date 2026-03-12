import { isAuthenticated } from '../services/api';

export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    window.location.replace('/login');
    return null;
  }
  return children;
}