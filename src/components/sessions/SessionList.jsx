import { useState } from 'react';
import { SessionItem } from './SessionItem';
import { EmptyState } from '../common/EmptyState';

export function SessionList({ sessions, tasks, onComplete, onDelete }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: open ? '1px solid var(--border, #e5e7eb)' : 'none',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ fontWeight: 600, fontSize: '.95rem' }}>
          📋 Histórico de Sessões <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({sessions.length})</span>
        </span>
        <span style={{
          fontSize: '1.1rem',
          transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'transform .25s ease',
          display: 'inline-block',
          color: 'var(--muted)',
        }}>
          ▾
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows .3s ease',
      }}>
        <div style={{ overflow: 'hidden' }}>
          {!sessions.length ? (
            <div style={{ padding: 16 }}>
              <EmptyState
                icon="🍅"
                text="Nenhuma sessão registrada."
                hint="Use o timer acima para iniciar uma sessão de foco."
              />
            </div>
          ) : (
            <div style={{ padding: '8px 0' }}>
              {[...sessions].reverse().map(s => (
                <SessionItem
                  key={s.id}
                  session={s}
                  tasks={tasks}
                  onComplete={onComplete}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
