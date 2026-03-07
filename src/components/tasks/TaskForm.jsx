import { useState, useEffect } from 'react';

const EMPTY = { title: '', status: 'TODO', priority: 'MEDIUM', pomodorosGoal: 4, projectId: '' };

export function TaskForm({ editing, projects, onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(editing
      ? {
          title:         editing.title,
          status:        editing.status,
          priority:      editing.priority,
          pomodorosGoal: editing.pomodorosGoal || 4,
          projectId:     editing.project ? String(editing.project.id) : '',
        }
      : EMPTY
    );
  }, [editing]);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    const payload = {
      title:         form.title.trim(),
      status:        form.status,
      priority:      form.priority,
      pomodorosGoal: parseInt(form.pomodorosGoal) || 4,
      project:       form.projectId ? { id: parseInt(form.projectId) } : null,
    };
    onSave(payload, editing?.id);
  };

  return (
    <div className="form-card">
      <div className="section-title">📝 {editing ? 'Editar Task' : 'Nova Task'}</div>
      <div className="form-grid">
        <div className="form-row" style={{ gridColumn: '1/-1' }}>
          <label>Título</label>
          <input value={form.title} onChange={set('title')} placeholder="Ex: Estudar React por 1 hora" />
        </div>
        <div className="form-row">
          <label>Projeto</label>
          <select value={form.projectId} onChange={set('projectId')}>
            <option value="">Sem projeto</option>
            {projects.map(p => (
              <option key={p.id} value={String(p.id)}>{p.icon || '📁'} {p.name}</option>
            ))}
          </select>
        </div>
        <div className="form-row" style={{ gridColumn: '1/-1' }}>
          <label>Status</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            {[
              { value: 'TODO',        label: '📋 A fazer' },
              { value: 'IN_PROGRESS', label: '⚡ Na fila' },
              { value: 'DONE',        label: '✅ Concluída' },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, status: value }))}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  border: '2px solid',
                  borderColor: form.status === value ? 'var(--primary, #6366f1)' : 'var(--border, #e5e7eb)',
                  borderRadius: 8,
                  background: form.status === value ? 'var(--primary-light, #ede9fe)' : 'transparent',
                  color: form.status === value ? 'var(--primary, #6366f1)' : 'var(--text, #111)',
                  fontWeight: form.status === value ? 700 : 400,
                  cursor: 'pointer',
                  fontSize: '.85rem',
                  transition: 'all .15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="form-row">
          <label>Prioridade</label>
          <select value={form.priority} onChange={set('priority')}>
            <option value="LOW">🟢 Baixa</option>
            <option value="MEDIUM">🟡 Média</option>
            <option value="HIGH">🔴 Alta</option>
          </select>
        </div>
        <div className="form-row">
          <label>Meta de Pomodoros</label>
          <input type="number" value={form.pomodorosGoal} onChange={set('pomodorosGoal')} min={1} max={20} />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" onClick={handleSave}>💾 Salvar</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
