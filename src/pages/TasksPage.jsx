import { useEffect, useState } from 'react';
import { useTasks }    from '../hooks/useTasks';
import { useProjects } from '../hooks/useProjects';
import { TaskStats }   from '../components/tasks/TaskStats';
import { TaskForm }    from '../components/tasks/TaskForm';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskList }    from '../components/tasks/TaskList';

export function TasksPage({ onGoToPomodoro }) {
  const { projects, load: loadProjects } = useProjects();
  const {
    filtered, stats, filterStatus, filterProject, search, sortBy,
    setFilterStatus, setFilterProject, setSearch, setSortBy,
    load, save, remove, reorder,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null);

  useEffect(() => { loadProjects(); load(); }, []);

  const handleSave = async (payload, editId) => {
    const ok = await save(payload, editId);
    if (ok) { setShowForm(false); setEditing(null); }
  };

  const handleEdit = (task) => {
    setEditing(task); setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page">
      <h1 className="page-title">Minhas Tasks</h1>
      <p className="page-sub">Gerencie suas tarefas e acompanhe o progresso</p>
      <TaskStats stats={stats} />
      <button className="btn btn-primary btn-wide" onClick={() => { setEditing(null); setShowForm(p => !p); }} style={{ marginBottom: 16 }}>
        ＋ Nova Task
      </button>
      {showForm && (
        <TaskForm editing={editing} projects={projects} onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }} />
      )}
      <TaskFilters
        filterStatus={filterStatus} filterProject={filterProject}
        search={search} sortBy={sortBy} projects={projects}
        onStatusChange={setFilterStatus} onProjectChange={setFilterProject}
        onSearchChange={setSearch} onSortChange={setSortBy}
      />
      <TaskList
        tasks={filtered} projects={projects}
        onEdit={handleEdit}
        onDelete={(id) => { if (!confirm('Deletar task?')) return; remove(id); }}
        onGoToPomodoro={onGoToPomodoro}
        onReorder={reorder}
      />
    </div>
  );
}
