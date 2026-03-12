import { useState, useEffect } from 'react';

const EMPTY = { name: '', emoji: '📁', parentId: '' };

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

export function ProjectForm({ editing, onSave, onCancel, projectsFlat = [], defaultParentId = null }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (editing) {
      setForm({
        name:     editing.name     || '',
        emoji:    editing.emoji    || '📁',
        parentId: editing.parentId != null ? String(editing.parentId) : '',
      });
    } else {
      setForm({ ...EMPTY, parentId: defaultParentId != null ? String(defaultParentId) : '' });
    }
  }, [editing, defaultParentId]);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  const setEmoji = (emoji) => setForm(prev => ({ ...prev, emoji }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({
      name:     form.name.trim(),
      emoji:    form.emoji || '📁',
      parentId: form.parentId ? Number(form.parentId) : null,
    }, editing?.id);
  };

  const parentOptions = projectsFlat.filter(p => p.id !== editing?.id);

  return (
    <div className="form-card">
      <div className="section-title">📁 {editing ? 'Editar Projeto' : 'Novo Projeto'}</div>
      <div className="form-grid">

        <div className="form-row" style={{ gridColumn: '1/-1' }}>
          <label htmlFor="project-name">Nome</label>
          <input id="project-name" value={form.name} onChange={set('name')} placeholder="Ex: Site do Cliente" />
        </div>

        <div className="form-row" style={{ gridColumn: '1/-1' }}>
          <label htmlFor="project-parent">
            Projeto pai <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(opcional)</span>
          </label>
          <select
            id="project-parent"
            value={form.parentId}
            onChange={set('parentId')}
            style={{
              padding: '10px 12px', borderRadius: 8,
              border: '1.5px solid var(--border)',
              background: 'var(--card)', color: 'var(--text)', fontSize: '.9rem',
            }}
          >
            <option value="">— Nenhum (projeto raiz) —</option>
            {parentOptions.map(p => (
              <option key={p.id} value={p.id}>{p.emoji || '📁'} {p.name}</option>
            ))}
          </select>
        </div>

        <div className="form-row" style={{ gridColumn: '1/-1' }}>
          <label>Ícone — selecionado: <strong>{form.emoji}</strong></label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
            {EMOJI_OPTIONS.map(({ emoji, label }) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setEmoji(emoji)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 12px', fontSize: '.9rem', border: '2px solid',
                  borderColor: form.emoji === emoji ? 'var(--primary, #6366f1)' : 'var(--border, #e5e7eb)',
                  borderRadius: 8,
                  background: form.emoji === emoji ? 'var(--primary, #6366f1)' : 'transparent',
                  cursor: 'pointer', transition: 'all .15s', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{emoji}</span>
                <span style={{ color: form.emoji === emoji ? '#fff' : 'var(--text)', fontWeight: form.emoji === emoji ? 600 : 400 }}>{label}</span>
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
