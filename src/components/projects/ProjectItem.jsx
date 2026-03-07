const fmtDate = d => d ? new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—';

export function ProjectItem({ project, onEdit, onDelete }) {
  const { name, icon, color, createdAt, taskTotal = 0, taskDone = 0 } = project;
  const pct = taskTotal > 0 ? Math.round((taskDone / taskTotal) * 100) : 0;

  return (
    <div className="item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
      {/* Linha principal */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="swatch" style={{ background: color || '#FBBF24', width: 16, height: 16, flexShrink: 0 }} />
        <div className="item-body">
          <div className="item-title">{icon || '📁'} {name}</div>
          <div className="item-meta">
            Criado em {fmtDate(createdAt)}
            {taskTotal > 0 && (
              <span style={{ marginLeft: 10 }}>
                · {taskDone}/{taskTotal} tasks concluídas
              </span>
            )}
          </div>
        </div>
        <div className="item-actions" style={{ flexShrink: 0 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(project)}>✏️ Editar</button>
          <button className="btn btn-danger" onClick={() => onDelete(project.id)}>🗑</button>
        </div>
      </div>

      {/* Barra de progresso */}
      {taskTotal > 0 && (
        <div style={{ paddingLeft: 30 }}>
          <div style={{
            height: 6,
            borderRadius: 99,
            background: 'var(--border, #e5e7eb)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              borderRadius: 99,
              background: pct === 100 ? 'var(--success, #10b981)' : (color || '#FBBF24'),
              transition: 'width .4s ease',
            }} />
          </div>
          <div style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: 3, textAlign: 'right' }}>
            {pct}%{pct === 100 ? ' 🎉' : ''}
          </div>
        </div>
      )}
    </div>
  );
}
