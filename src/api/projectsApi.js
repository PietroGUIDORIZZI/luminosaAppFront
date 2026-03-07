import { client } from './client';

export const projectsApi = {
  getAll:  ()          => client.get('/projects'),
  create:  (data)      => client.post('/projects', data),
  update:  (id, data)  => client.put(`/projects/${id}`, data),
  remove:  (id)        => client.delete(`/projects/${id}`),
  reorder: (ids)       => client.patch('/projects/reorder', { ids }),
};
