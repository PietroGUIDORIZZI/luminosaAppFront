/**
 * CAMADA DE API — cliente HTTP base
 * Token JWT injetado automaticamente em cada requisição.
 * 401/403 → limpa token e redireciona para /login.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

function getToken() {
  return localStorage.getItem('luminosa_token');
}

async function request(path, options = {}) {
  const { body, ...rest } = options;
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...rest,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('luminosa_token');
    window.location.reload();
    return null;
  }

  if (!res.ok) {
    const msg = await res.text().catch(() => `HTTP ${res.status}`);
    throw new Error(msg || `HTTP ${res.status}`);
  }

  if (res.status === 204) return null;

  return res.json();
}

export const client = {
  get:    (path)        => request(path),
  post:   (path, body)  => request(path, { method: 'POST',   body }),
  put:    (path, body)  => request(path, { method: 'PUT',    body }),
  patch:  (path, body)  => request(path, { method: 'PATCH',  body }),
  delete: (path)        => request(path, { method: 'DELETE' }),
};

export async function checkApiHealth() {
  try {
    const token = getToken();
    await fetch(`${BASE_URL}/projects`, {
      signal: AbortSignal.timeout(2000),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return true;
  } catch {
    return false;
  }
}
