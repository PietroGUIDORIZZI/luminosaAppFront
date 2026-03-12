import { useEffect, useState } from 'react';
import { useProjects }  from '../hooks/useProjects';
import { ProjectForm }  from '../components/projects/ProjectForm';
import { ProjectList }  from '../components/projects/ProjectList';

export function ProjectsPage() {
  const { projects, projectsFlat, load, save, remove } = useProjects();
  const [showForm, setShowForm]         = useState(false);
  const [editing, setEditing]           = useState(null);
  const [defaultParentId, setDefaultParentId] = useState(null);

  useEffect(() => { load(); }, []);

  const handleSave = async (payload, editId) => {
    const ok = await save(payload, editId);
    if (ok) { setShowForm(false); setEditing(null); setDefaultParentId(null); }
  };

  const handleEdit = (project) => {
    setEditing(project);
    setDefaultParentId(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Botão "＋ Sub" em um item abre o form com o pai pré-selecionado
  const handleAddChild = (parentProject) => {
    setEditing(null);
    setDefaultParentId(parentProject.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNew = () => {
    setEditing(null);
    setDefaultParentId(null);
    setShowForm(p => !p);
  };

  return (
    <div className="page">
      <h1 className="page-title">Projetos</h1>
      <p className="page-sub">Organize suas tasks por projeto e subprojeto</p>

      <button className="btn btn-primary btn-wide" onClick={handleNew} style={{ marginBottom: 16 }}>
        ＋ Novo Projeto
      </button>

      {showForm && (
        <ProjectForm
          editing={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); setDefaultParentId(null); }}
          projectsFlat={projectsFlat}
          defaultParentId={defaultParentId}
        />
      )}

      <ProjectList
        projects={projects}
        onEdit={handleEdit}
        onDelete={(id) => { if (!confirm('Deletar projeto e todos os subprojetos?')) return; remove(id); }}
        onAddChild={handleAddChild}
      />
    </div>
  );
}
