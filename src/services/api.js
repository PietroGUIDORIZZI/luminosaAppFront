// BASE_URL já inclui /api — ex: https://luminosa-backend-with-ia.onrender.com/api
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

function getToken() {
  return localStorage.getItem('luminosa_token');
}

export function saveToken(token) {
  localStorage.setItem('luminosa_token', token);
}

export function clearToken() {
  localStorage.removeItem('luminosa_token');
  window.dispatchEvent(new Event('auth:logout'));
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

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('luminosa_token');
    window.dispatchEvent(new Event('auth:logout'));
    return null;
  }

  return response;
}

export const api = {
  get:    (path)       => request(path),
  post:   (path, body) => request(path, { method: 'POST',  body: JSON.stringify(body) }),
  put:    (path, body) => request(path, { method: 'PUT',   body: JSON.stringify(body) }),
  patch:  (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path)       => request(path, { method: 'DELETE' }),
};

// Auth usa BASE_URL diretamente — /auth/login em vez de /api/auth/login
export const authApi = {
  register: (email, password) =>
    fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),

  login: (email, password) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),
};
