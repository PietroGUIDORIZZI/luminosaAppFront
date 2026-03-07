const fmtDate = d => d ? new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—';

export function SessionItem({ session, tasks, onComplete, onDelete }) {
  const task = tasks.find(t => t.id === (session.task?.id ?? session.taskId));

  return (
    <div className="item">
      <div style={{ fontSize: '1.4rem' }}>🍅</div>
      <div className="item-body">
        <div className="item-title">{task ? task.title : 'Task removida'}</div>
        <div className="item-meta" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
          <span className={`badge ${session.completed ? 'badge-green' : 'badge-yellow'}`}>
            {session.completed ? 'Concluída' : 'Em andamento'}
          </span>
          <span style={{ color: 'var(--muted)' }}>⏱ {session.durationMinutes || 25} min</span>
          <span style={{ color: 'var(--muted)' }}>{fmtDate(session.createdAt)}</span>
        </div>
      </div>
      <div className="item-actions">
        <button className="btn btn-danger" onClick={() => onDelete(session.id)}>🗑</button>
      </div>
    </div>
  );
}
