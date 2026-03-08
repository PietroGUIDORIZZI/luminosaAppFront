import { useEffect } from 'react';
import { useSessions }    from '../hooks/useSessions';
import { useTasks }       from '../hooks/useTasks';
import { PomodoroTimer }  from '../components/sessions/PomodoroTimer';
import { SessionStats }   from '../components/sessions/SessionStats';
import { SessionList }    from '../components/sessions/SessionList';

export function SessionsPage({ preSelectedTaskId }) {
  const { sessions, stats, load, create, complete, remove } = useSessions();
  const { tasks, load: loadTasks } = useTasks();

  useEffect(() => { load(); loadTasks(); }, []);

  return (
    <div className="page">
      <h1 className="page-title">Pomodoro</h1>
      <p className="page-sub">Registre e acompanhe suas sessões de foco</p>

      <PomodoroTimer
        tasks={tasks}
        preSelectedTaskId={preSelectedTaskId}
        onSessionStart={(durationMinutes, taskId) => create(durationMinutes, taskId)}
        onSessionComplete={(sessionId, durationMinutes) => complete(sessionId, durationMinutes)}
        onSessionCancel={(sessionId) => remove(sessionId)}
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
