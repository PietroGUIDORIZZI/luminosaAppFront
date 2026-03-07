import { useEffect, useState } from 'react';
import { useProjects }  from '../hooks/useProjects';
import { ProjectForm }  from '../components/projects/ProjectForm';
import { ProjectList }  from '../components/projects/ProjectList';

export function ProjectsPage() {
  const { projects, load, save, remove, reorder } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null);

  useEffect(() => { load(); }, []);

  const handleSave = async (payload, editId) => {
    const ok = await save(payload, editId);
    if (ok) { setShowForm(false); setEditing(null); }
  };

  const handleEdit = (project) => {
    setEditing(project); setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page">
      <h1 className="page-title">Projetos</h1>
      <p className="page-sub">Organize suas tasks por projeto</p>
      <button className="btn btn-primary btn-wide" onClick={() => { setEditing(null); setShowForm(p => !p); }} style={{ marginBottom: 16 }}>
        ＋ Novo Projeto
      </button>
      {showForm && (
        <ProjectForm editing={editing} onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }} />
      )}
      <ProjectList projects={projects} onEdit={handleEdit}
        onDelete={(id) => { if (!confirm('Deletar projeto?')) return; remove(id); }}
        onReorder={reorder}
      />
    </div>
  );
}
