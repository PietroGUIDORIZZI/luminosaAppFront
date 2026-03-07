import { StatusBadge, PriorityBadge, Badge } from '../common/Badge';

function PomodoroDots({ done, goal }) {
  return (
    <div className="pomodoro-dots">
      {Array.from({ length: goal }, (_, i) => (
        <div key={i} className={`dot${i < done ? ' done' : ''}`} />
      ))}
    </div>
  );
}

export function TaskItem({ task, projects, onEdit, onDelete, selected, onSelect, onGoToPomodoro }) {
  const { title, status, priority, pomodorosDone = 0, pomodorosGoal = 4, project } = task;
  const proj = project ? projects.find(p => p.id === project.id) : null;

  return (
    <div
      className="item"
      style={{
        border: selected ? '2px solid var(--primary, #6366f1)' : '2px solid transparent',
        borderRadius: 8,
        background: selected ? 'var(--primary-light, #ede9fe)' : undefined,
        transition: 'all .15s',
        // empilha em coluna quando selecionado em telas pequenas
        flexWrap: 'wrap',
      }}
    >
      {/* Radio de seleção */}
      <div
        style={{ flexShrink: 0, cursor: 'pointer' }}
        onClick={() => onSelect(task.id)}
        title="Selecionar para o Pomodoro"
      >
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          border: '2px solid',
          borderColor: selected ? 'var(--primary, #6366f1)' : 'var(--border, #d1d5db)',
          background: selected ? 'var(--primary, #6366f1)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .15s',
        }}>
          {selected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
        </div>
      </div>

      {/* Cor do projeto */}
      <div style={{ flexShrink: 0 }}>
        {proj
          ? <div className="swatch" style={{ background: proj.color || '#FBBF24' }} />
          : <div style={{ width: 14 }} />
        }
      </div>

      {/* Corpo */}
      <div className="item-body">
        <div className="item-title">{title}</div>
        <div className="item-meta" style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 5 }}>
          <StatusBadge status={status} />
          <PriorityBadge priority={priority} />
          {proj && <Badge variant="gray">{proj.icon || '📁'} {proj.name}</Badge>}
          <PomodoroDots done={pomodorosDone} goal={pomodorosGoal} />
          <span style={{ color: 'var(--muted)', fontSize: '.75rem' }}>🍅 {pomodorosDone}/{pomodorosGoal}</span>
        </div>

        {/* Botão Focar ABAIXO do título em mobile (dentro do item-body) */}
        {selected && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onGoToPomodoro(task.id)}
            style={{ marginTop: 10, display: 'none' }}
            data-focar="true"
          >
            🍅 Focar agora
          </button>
        )}
      </div>

      {/* Ações — Focar fica aqui em desktop */}
      <div className="item-actions">
        {selected && (
          <button
            className="btn btn-primary btn-sm focar-desktop"
            onClick={() => onGoToPomodoro(task.id)}
          >
            🍅 Focar
          </button>
        )}
        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(task)}>✏️</button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>🗑</button>
      </div>
    </div>
  );
}
