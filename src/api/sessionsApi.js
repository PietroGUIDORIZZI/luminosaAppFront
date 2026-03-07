/**
 * CAMADA DE API — Sessões Pomodoro
 *
 * Endpoints esperados no Spring Boot:
 *   GET    /api/sessions
 *   POST   /api/sessions
 *   PATCH  /api/sessions/:id/complete
 *   DELETE /api/sessions/:id
 */

import { client } from './client';

export const sessionsApi = {
  getAll:   ()     => client.get('/sessions'),
  create:   (data) => client.post('/sessions', data),
  complete: (id)   => client.patch(`/sessions/${id}/complete`),
  remove:   (id)   => client.delete(`/sessions/${id}`),
};
