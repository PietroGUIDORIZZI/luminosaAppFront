import { useState, useCallback, useMemo } from 'react';
import { tasksApi } from '../api/tasksApi';
import { useToast } from '../context/ToastContext';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProject, setFilterProject] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await tasksApi.getAll();
      setTasks(data);
    } catch {
      toast('Erro ao carregar tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const save = useCallback(async (payload, editId) => {
    try {
      if (editId) { await tasksApi.update(editId, payload); toast('Task atualizada! ✅'); }
      else        { await tasksApi.create(payload);         toast('Task criada! ✅'); }
      await load();
      return true;
    } catch {
      toast('Erro ao salvar task', 'error');
      return false;
    }
  }, [load, toast]);

  const remove = useCallback(async (id) => {
    try {
      await tasksApi.remove(id);
      toast('Task deletada.');
      await load();
    } catch {
      toast('Erro ao deletar task', 'error');
    }
  }, [load, toast]);

  const reorder = useCallback(async (ids) => {
    try {
      await tasksApi.reorder(ids);
    } catch {
      toast('Erro ao salvar ordem', 'error');
    }
  }, [toast]);

  const PRIORITY_ORDER = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  const STATUS_ORDER   = { IN_PROGRESS: 0, TODO: 1, DONE: 2 };

  const filtered = useMemo(() => {
    let result = tasks;
    if (filterStatus  !== 'all') result = result.filter(t => t.status === filterStatus);
    if (filterProject !== 'all') result = result.filter(t => t.project && String(t.project.id) === filterProject);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q));
    }
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'title':         return a.title.localeCompare(b.title, 'pt-BR');
        case 'priority':      return (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9);
        case 'status':        return (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9);
        case 'pomodoros':     return (b.pomodorosDone || 0) - (a.pomodorosDone || 0);
        case 'createdAt_asc': return new Date(a.createdAt) - new Date(b.createdAt);
        case 'sortOrder':     return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
        case 'createdAt_desc':
        default:              return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    return result;
  }, [tasks, filterStatus, filterProject, search, sortBy]);

  const stats = useMemo(() => ({
    total:     tasks.length,
    done:      tasks.filter(t => t.status === 'DONE').length,
    inProg:    tasks.filter(t => t.status === 'IN_PROGRESS').length,
    pomodoros: tasks.reduce((a, t) => a + (t.pomodorosDone || 0), 0),
  }), [tasks]);

  return {
    tasks, filtered, stats, loading,
    filterStatus, filterProject, search, sortBy,
    setFilterStatus, setFilterProject, setSearch, setSortBy,
    load, save, remove, reorder,
  };
}
