import { useState } from 'react';
import { ProjectItem } from './ProjectItem';
import { EmptyState } from '../common/EmptyState';

export function ProjectList({ projects, onEdit, onDelete, onReorder }) {
  const [open, setOpen] = useState(true);
  const [order, setOrder] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  const displayed = order
    ? order.map(id => projects.find(p => p.id === id)).filter(Boolean)
    : projects;

  const onDragStart = (e, id) => { setDraggedId(id); e.dataTransfer.effectAllowed = 'move'; };
  const onDragOver  = (e, id) => { e.preventDefault(); if (id !== draggedId) setDragOverId(id); };
  const onDrop = async (e, targetId) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;
    const ids = displayed.map(p => p.id);
    const from = ids.indexOf(draggedId);
    const to   = ids.indexOf(targetId);
    const next = [...ids];
    next.splice(from, 1);
    next.splice(to, 0, draggedId);
    setOrder(next);
    setDraggedId(null);
    setDragOverId(null);
    await onReorder?.(next);
  };
  const onDragEnd = () => { setDraggedId(null); setDragOverId(null); };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: open ? '1px solid var(--border, #e5e7eb)' : 'none',
          cursor: 'pointer', userSelect: 'none',
        }}
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ fontWeight: 600, fontSize: '.95rem' }}>
          📁 Projetos <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({projects.length})</span>
        </span>
        <span style={{ fontSize: '1.1rem', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform .25s ease', display: 'inline-block', color: 'var(--muted)' }}>▾</span>
      </div>

      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .3s ease' }}>
        <div style={{ overflow: 'hidden' }}>
          {!displayed.length ? (
            <div style={{ padding: 16 }}>
              <EmptyState icon="📁" text="Nenhum projeto ainda." hint="Crie seu primeiro projeto acima." />
            </div>
          ) : (
            <div style={{ padding: '8px 0' }}>
              {displayed.map(p => (
                <div
                  key={p.id}
                  draggable
                  onDragStart={e => onDragStart(e, p.id)}
                  onDragOver={e => onDragOver(e, p.id)}
                  onDrop={e => onDrop(e, p.id)}
                  onDragEnd={onDragEnd}
                  style={{
                    opacity: draggedId === p.id ? 0.35 : 1,
                    borderTop: dragOverId === p.id ? '2px solid var(--primary, #6366f1)' : '2px solid transparent',
                    transition: 'opacity .15s, border-color .1s',
                  }}
                >
                  <ProjectItem project={p} onEdit={onEdit} onDelete={onDelete} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
