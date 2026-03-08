import { client } from './client';

export const sessionsApi = {
  getAll:   ()                        => client.get('/sessions'),
  create:   (data)                    => client.post('/sessions', data),
  complete: (id, durationMinutes)     => client.patch(`/sessions/${id}/complete`, durationMinutes ? { durationMinutes } : {}),
  remove:   (id)                      => client.delete(`/sessions/${id}`),
};
