import { useState } from 'react';

const fmtDate = d => d ? new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—';

export function ProjectItem({ project, onEdit, onDelete, onAddChild, depth = 0 }) {
  const { name, emoji, createdAt, children = [] } = project;
  const [expanded, setExpanded] = useState(true);

  const indent = depth * 20;
  const hasChildren = children.length > 0;

  return (
    <div>
      {/* Item principal */}
      <div
        className="item"
        style={{
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 8,
          marginLeft: indent,
          borderLeft: depth > 0 ? '2px solid var(--border)' : 'none',
          paddingLeft: depth > 0 ? 12 : 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Botão de expandir/colapsar se tiver filhos */}
          {hasChildren ? (
            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontSize: '0.75rem', color: 'var(--muted)', padding: '0 2px',
                transition: 'transform .2s',
                transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                display: 'inline-block',
              }}
            >
              ▾
            </button>
          ) : (
            <span style={{ width: 16 }} />
          )}

          <div className="item-body" style={{ flex: 1 }}>
            <div className="item-title" style={{ fontSize: depth > 0 ? '.9rem' : '1rem' }}>
              {emoji || '📁'} {name}
              {depth > 0 && (
                <span style={{ fontSize: '.7rem', color: 'var(--muted)', marginLeft: 8, fontWeight: 400 }}>
                  subprojeto
                </span>
              )}
            </div>
            <div className="item-meta">
              Criado em {fmtDate(createdAt)}
              {hasChildren && (
                <span style={{ marginLeft: 8 }}>
                  · {children.length} subprojeto{children.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          <div className="item-actions" style={{ flexShrink: 0, display: 'flex', gap: 4 }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onAddChild(project)}
              title="Adicionar subprojeto"
              style={{ fontSize: '.8rem' }}
            >
              ＋ Sub
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => onEdit(project)}>✏️</button>
            <button className="btn btn-danger" onClick={() => onDelete(project.id)}>🗑</button>
          </div>
        </div>
      </div>

      {/* Filhos recursivos */}
      {hasChildren && expanded && (
        <div style={{ marginLeft: indent + 16 }}>
          {children.map(child => (
            <ProjectItem
              key={child.id}
              project={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
