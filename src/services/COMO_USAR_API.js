// EXEMPLO — como atualizar as chamadas fetch existentes
// Você não precisa mudar nada nas suas chamadas fetch existentes de uma vez.
// Basta substituir `fetch('/api/...')` por `api.get/post/put/delete('/api/...')`

// ─── ANTES (sem autenticação) ─────────────────────────────────────────────────

// const res = await fetch('/api/projects');
// const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
// const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });

// ─── DEPOIS (com token automático) ───────────────────────────────────────────

import { api } from '../services/api';

// GET
const res = await api.get('/api/projects');
const projects = await res.json();

// POST
const res2 = await api.post('/api/projects', { name: 'Novo Projeto', emoji: '🚀' });
const project = await res2.json();

// PUT
const res3 = await api.put(`/api/projects/${id}`, { name: 'Atualizado' });

// PATCH
const res4 = await api.patch(`/api/sessions/${id}/complete`, { actualDurationMinutes: 25 });

// DELETE
await api.delete(`/api/projects/${id}`);

// ─── O token é injetado automaticamente em todas as chamadas ─────────────────
// Se o backend retornar 401 ou 403, o usuário é redirecionado para /login.
