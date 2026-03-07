/**
 * CAMADA DE API — cliente HTTP base
 *
 * Todos os requests passam por aqui.
 * Para integrar com Spring Boot, basta ajustar VITE_API_URL no .env
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

async function request(path, options = {}) {
  const { body, ...rest } = options;

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...rest,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => `HTTP ${res.status}`);
    throw new Error(msg || `HTTP ${res.status}`);
  }

  // 204 No Content — sem body
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
    await fetch(`${BASE_URL}/projects`, { signal: AbortSignal.timeout(2000) });
    return true;
  } catch {
    return false;
  }
}
