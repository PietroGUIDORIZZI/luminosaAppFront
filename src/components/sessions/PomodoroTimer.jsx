import { useState } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { useToast } from '../../context/ToastContext';

const TOTAL_SECONDS = 25 * 60;

export function PomodoroTimer({ tasks, preSelectedTaskId, onSessionStart, onSessionComplete, onSessionCancel }) {
  const { toast } = useToast();
  const [taskId, setTaskId] = useState(preSelectedTaskId ? String(preSelectedTaskId) : '');
  const [activeSessionId, setActiveSessionId] = useState(null);

  // Calcula minutos decorridos a partir dos segundos restantes
  const elapsedMinutes = (secondsLeft) => {
    const elapsed = TOTAL_SECONDS - secondsLeft;
    return Math.max(1, Math.round(elapsed / 60)); // mínimo 1 min
  };

  const handleFinish = async () => {
    toast('🎉 Pomodoro concluído! Hora de uma pausa.');
    if (activeSessionId) {
      await onSessionComplete?.(activeSessionId, 25); // timer zerou = 25 min completos
      setActiveSessionId(null);
    }
  };

  const { seconds, display, running, start, pause, reset } = useTimer({ onFinish: handleFinish });

  const handleStart = async () => {
    if (running) return;
    if (!activeSessionId) {
      const session = await onSessionStart?.(25, taskId);
      if (session?.id) setActiveSessionId(session.id);
    }
    start();
  };

  const handlePause = () => { pause(); toast('Timer pausado ⏸'); };

  const handleComplete = async () => {
    const mins = elapsedMinutes(seconds);
    reset();
    if (activeSessionId) {
      await onSessionComplete?.(activeSessionId, mins);
      setActiveSessionId(null);
      toast(`Sessão concluída em ${mins} min ✅`);
    }
  };

  const handleReset = async () => {
    reset();
    if (activeSessionId) {
      await onSessionCancel?.(activeSessionId);
      toast('Sessão cancelada e removida 🗑');
    }
    setActiveSessionId(null);
  };

  const handleTaskChange = (e) => {
    if (activeSessionId) {
      reset();
      onSessionCancel?.(activeSessionId);
      setActiveSessionId(null);
      toast('Task alterada — sessão anterior cancelada', 'error');
    }
    setTaskId(e.target.value);
  };

  const startLabel = running ? '⏱ Em andamento' : activeSessionId ? '▶ Retomar' : '▶ Iniciar';

  return (
    <div className="card" style={{ textAlign: 'center', marginBottom: 20 }}>
      <div style={{ fontSize: '.82rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>
        Temporizador
      </div>
      <div className="timer-display">{display}</div>
      <div style={{ marginBottom: 8 }}>
        <select value={taskId} onChange={handleTaskChange} style={{ maxWidth: 260, margin: '0 auto', display: 'block' }}>
          <option value="">— Selecione uma task —</option>
          {tasks.map(t => (
            <option key={t.id} value={String(t.id)}>{t.project?.icon || '🍅'} {t.title}</option>
          ))}
        </select>
      </div>
      <div className="timer-controls">
        <button className="btn btn-primary" onClick={handleStart} disabled={running}>{startLabel}</button>
        <button className="btn btn-ghost" onClick={handlePause} disabled={!running}>⏸ Pausar</button>
        <button className="btn btn-ghost" onClick={handleReset}>↺ Reset</button>
        {activeSessionId && (
          <button className="btn btn-ghost" onClick={handleComplete} style={{ color: '#22c55e', borderColor: '#22c55e' }}>
            ✅ Concluir
          </button>
        )}
      </div>
      {activeSessionId && (
        <div style={{ marginTop: 8, fontSize: '.75rem', color: 'var(--muted)' }}>
          {running ? '🔴 Sessão em andamento' : '⏸ Sessão pausada — clique Retomar'}
        </div>
      )}
    </div>
  );
}
