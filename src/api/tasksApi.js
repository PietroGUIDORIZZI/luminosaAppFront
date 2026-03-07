import { client } from './client';

export const tasksApi = {
  getAll:  ()          => client.get('/tasks'),
  create:  (data)      => client.post('/tasks', data),
  update:  (id, data)  => client.put(`/tasks/${id}`, data),
  remove:  (id)        => client.delete(`/tasks/${id}`),
  reorder: (ids)       => client.patch('/tasks/reorder', { ids }),
};
