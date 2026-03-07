import { useEffect } from 'react';
import { useSessions }    from '../hooks/useSessions';
import { useTasks }       from '../hooks/useTasks';
import { PomodoroTimer }  from '../components/sessions/PomodoroTimer';
import { SessionStats }   from '../components/sessions/SessionStats';
import { SessionList }    from '../components/sessions/SessionList';

export function SessionsPage({ preSelectedTaskId }) {
  const { sessions, stats, load, create, complete, remove } = useSessions();
  const { tasks, load: loadTasks } = useTasks();

  useEffect(() => {
    load();
    loadTasks();
  }, []);

  const handleSessionStart = async (durationMinutes, taskId) => {
    const session = await create(durationMinutes, taskId);
    return session;
  };

  const handleSessionComplete = async (sessionId) => {
    await complete(sessionId);
  };

  const handleSessionCancel = async (sessionId) => {
    await remove(sessionId);
  };

  return (
    <div className="page">
      <h1 className="page-title">Pomodoro</h1>
      <p className="page-sub">Registre e acompanhe suas sessões de foco</p>

      <PomodoroTimer
        tasks={tasks}
        preSelectedTaskId={preSelectedTaskId}
        onSessionStart={handleSessionStart}
        onSessionComplete={handleSessionComplete}
        onSessionCancel={handleSessionCancel}
      />

      <SessionStats stats={stats} />

      <div className="section-title">📋 Histórico de Sessões</div>
      <SessionList
        sessions={sessions}
        tasks={tasks}
        onComplete={complete}
        onDelete={(id) => { if (!confirm('Deletar sessão?')) return; remove(id); }}
      />
    </div>
  );
}
