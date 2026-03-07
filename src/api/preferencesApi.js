import { client } from './client';

export const preferencesApi = {
  get:    ()      => client.get('/preferences'),
  update: (theme) => client.put('/preferences', { theme }),
};
