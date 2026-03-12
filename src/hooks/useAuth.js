// src/hooks/useAuth.js
import { useState } from 'react';
import { authApi, saveToken, clearToken, isAuthenticated } from '../services/api';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  async function login(email, password) {
    setLoading(true);
    setError(null);
    try {
      const res  = await authApi.login(email, password);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Erro ao fazer login');
        return false;
      }

      saveToken(data.token);
      return true;
    } catch {
      setError('Erro de conexão com o servidor');
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(email, password) {
    setLoading(true);
    setError(null);
    try {
      const res  = await authApi.register(email, password);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Erro ao criar conta');
        return false;
      }

      saveToken(data.token);
      return true;
    } catch {
      setError('Erro de conexão com o servidor');
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearToken();
    window.location.reload();
  }

  return { login, register, logout, loading, error, isAuthenticated };
}
