import { useState } from 'react';
import { TaskItem } from './TaskItem';
import { EmptyState } from '../common/EmptyState';

export function TaskList({ tasks, projects, onEdit, onDelete, onGoToPomodoro, onReorder }) {
  const [open, setOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [order, setOrder] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  const handleSelect = (id) => setSelectedId(prev => prev === id ? null : id);

  const displayed = order
    ? order.map(id => tasks.find(t => t.id === id)).filter(Boolean)
    : tasks;

  const onDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };
  const onDragOver = (e, id) => {
    e.preventDefault();
    if (id !== draggedId) setDragOverId(id);
  };
  const onDrop = async (e, targetId) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;
    const ids = displayed.map(t => t.id);
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
          ✅ Tarefas <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({tasks.length})</span>
        </span>
        <span style={{ fontSize: '1.1rem', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform .25s ease', display: 'inline-block', color: 'var(--muted)' }}>▾</span>
      </div>

      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .3s ease' }}>
        <div style={{ overflow: 'hidden' }}>
          {!displayed.length ? (
            <div style={{ padding: 16 }}>
              <EmptyState icon="✅" text="Nenhuma task encontrada." hint="Tente mudar os filtros ou crie uma nova task." />
            </div>
          ) : (
            <div style={{ padding: '8px 0' }}>
              {displayed.map(t => (
                <div
                  key={t.id}
                  draggable
                  onDragStart={e => onDragStart(e, t.id)}
                  onDragOver={e => onDragOver(e, t.id)}
                  onDrop={e => onDrop(e, t.id)}
                  onDragEnd={onDragEnd}
                  style={{
                    opacity: draggedId === t.id ? 0.35 : 1,
                    borderTop: dragOverId === t.id ? '2px solid var(--primary, #6366f1)' : '2px solid transparent',
                    transition: 'opacity .15s, border-color .1s',
                  }}
                >
                  <TaskItem
                    task={t} projects={projects}
                    onEdit={onEdit} onDelete={onDelete}
                    selected={selectedId === t.id}
                    onSelect={handleSelect}
                    onGoToPomodoro={onGoToPomodoro}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
