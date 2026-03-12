import { ProjectItem } from './ProjectItem';
import { EmptyState }  from '../common/EmptyState';

export function ProjectList({ projects, onEdit, onDelete, onAddChild }) {
  if (!projects.length) {
    return (
      <div className="card" style={{ padding: 16 }}>
        <EmptyState icon="📁" text="Nenhum projeto ainda." hint="Crie seu primeiro projeto acima." />
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '8px 0', overflow: 'hidden' }}>
      {projects.map(p => (
        <ProjectItem
          key={p.id}
          project={p}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
          depth={0}
        />
      ))}
    </div>
  );
}
