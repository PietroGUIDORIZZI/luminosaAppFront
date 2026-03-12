// src/services/api.js
// ─────────────────────────────────────────────────────────────
// Wrapper global de fetch.
// Toda chamada à API passa por aqui — token é injetado
// automaticamente e 401 redireciona para o login.
// ─────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function getToken() {
  return localStorage.getItem('luminosa_token');
}

export function saveToken(token) {
  localStorage.setItem('luminosa_token', token);
}

export function clearToken() {
  localStorage.removeItem('luminosa_token');
}

export function isAuthenticated() {
  return !!getToken();
}

async function request(path, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  // Token expirado ou inválido → limpa e redireciona para login
  if (response.status === 401 || response.status === 403) {
    clearToken();
    window.location.href = '/login';
    return;
  }

  return response;
}

// ── Métodos de conveniência ───────────────────────────────────
export const api = {
  get:    (path)         => request(path),
  post:   (path, body)   => request(path, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (path, body)   => request(path, { method: 'PUT',    body: JSON.stringify(body) }),
  patch:  (path, body)   => request(path, { method: 'PATCH',  body: JSON.stringify(body) }),
  delete: (path)         => request(path, { method: 'DELETE' }),
};

// ── Auth ──────────────────────────────────────────────────────
export const authApi = {
  register: (email, password) =>
    fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),

  login: (email, password) =>
    fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),
};
