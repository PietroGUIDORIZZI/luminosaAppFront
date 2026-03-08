import { useState, useEffect } from 'react';

const EMPTY = { name: '', color: '#FBBF24', icon: '📁' };

const EMOJI_OPTIONS = [
  { emoji: '📁', label: 'Pasta' },
  { emoji: '💼', label: 'Trabalho' },
  { emoji: '🎓', label: 'Estudos' },
  { emoji: '💻', label: 'Dev / Tech' },
  { emoji: '🎨', label: 'Design / Arte' },
  { emoji: '📱', label: 'Mobile / App' },
  { emoji: '🌐', label: 'Web / Site' },
  { emoji: '📊', label: 'Dados / Análise' },
  { emoji: '🔧', label: 'Manutenção' },
  { emoji: '🚀', label: 'Lançamento' },
  { emoji: '💡', label: 'Ideias' },
  { emoji: '📝', label: 'Escrita / Blog' },
  { emoji: '📸', label: 'Foto / Vídeo' },
  { emoji: '🎵', label: 'Música' },
  { emoji: '🏋️', label: 'Saúde / Fitness' },
  { emoji: '🏠', label: 'Casa / Pessoal' },
  { emoji: '💰', label: 'Finanças' },
  { emoji: '🤝', label: 'Clientes' },
  { emoji: '📦', label: 'Produto' },
  { emoji: '🔬', label: 'Pesquisa' },
  { emoji: '🌱', label: 'Crescimento' },
  { emoji: '⚙️', label: 'Infraestrutura' },
  { emoji: '🎯', label: 'Metas' },
  { emoji: '🗓️', label: 'Planejamento' },
];

export function ProjectForm({ editing, onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(editing
      ? { name: editing.name, color: editing.color || '#FBBF24', icon: editing.icon || '📁' }
      : EMPTY
    );
  }, [editing]);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  const setIcon = (emoji) => setForm(prev => ({ ...prev, icon: emoji }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({ name: form.name.trim(), color: form.color, icon: form.icon || '📁' }, editing?.id);
  };

  return (
    <div className="form-card">
      <div className="section-title">📁 {editing ? 'Editar Projeto' : 'Novo Projeto'}</div>
      <div className="form-grid">

        <div className="form-row" style={{ gridColumn: '1/-1' }}>
          <label>Nome</label>
          <input value={form.name} onChange={set('name')} placeholder="Ex: Site do Cliente" />
        </div>

        <div className="form-row">
          <label>Cor</label>
          <input type="color" value={form.color} onChange={set('color')} style={{ height: 44, padding: 4 }} />
        </div>

        <div className="form-row" style={{ gridColumn: '1/-1' }}>
          <label>Ícone — selecionado: <strong>{form.icon}</strong></label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            marginTop: 8,
          }}>
            {EMOJI_OPTIONS.map(({ emoji, label }) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setIcon(emoji)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  fontSize: '.9rem',
                  border: '2px solid',
                  borderColor: form.icon === emoji ? 'var(--primary, #6366f1)' : 'var(--border, #e5e7eb)',
                  borderRadius: 8,
                  background: form.icon === emoji ? 'var(--primary, #6366f1)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all .15s',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{emoji}</span>
                <span style={{ color: form.icon === emoji ? '#fff' : 'var(--text, #111)', fontWeight: form.icon === emoji ? 600 : 400 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
      <div className="form-actions">
        <button className="btn btn-primary" onClick={handleSave}>💾 Salvar</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
