/**
 * HOOK — useSessions
 * Encapsula estado e operações de sessões Pomodoro.
 */

import { useState, useCallback, useMemo } from 'react';
import { sessionsApi } from '../api/sessionsApi';
import { useToast } from '../context/ToastContext';

export function useSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await sessionsApi.getAll();
      setSessions(data);
    } catch {
      toast('Erro ao carregar sessões', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const create = useCallback(async (durationMinutes, taskId) => {
    const payload = {
      task: taskId ? { id: parseInt(taskId) } : null,
      durationMinutes,
      startedAt: new Date().toISOString(),
      completed: false,
    };
    try {
      const created = await sessionsApi.create(payload);
      toast('Sessão registrada! 🍅');
      await load();
      return created;
    } catch {
      toast('Erro ao salvar sessão', 'error');
      return null;
    }
  }, [load, toast]);

  const complete = useCallback(async (id) => {
    try {
      await sessionsApi.complete(id);
      toast('Sessão concluída! ✅');
      await load();
    } catch {
      toast('Erro ao concluir sessão', 'error');
    }
  }, [load, toast]);

  const remove = useCallback(async (id) => {
    try {
      await sessionsApi.remove(id);
      toast('Sessão deletada.');
      await load();
    } catch {
      toast('Erro ao deletar sessão', 'error');
    }
  }, [load, toast]);

  const stats = useMemo(() => {
    const total     = sessions.length;
    const completed = sessions.filter(s => s.completed).length;
    const totalMins = sessions.reduce((a, s) => a + (s.durationMinutes || 25), 0);
    return { total, completed, hours: (totalMins / 60).toFixed(1) };
  }, [sessions]);

  const lastIncomplete = useMemo(
    () => sessions.findLast?.(s => !s.completed) ?? [...sessions].reverse().find(s => !s.completed),
    [sessions]
  );

  return { sessions, stats, loading, lastIncomplete, load, create, complete, remove };
}
