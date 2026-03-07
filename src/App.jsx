import { useState } from 'react';
import { Navbar }       from './components/layout/Navbar';
import { MobileNav }    from './components/layout/MobileNav';
import { TasksPage }    from './pages/TasksPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SessionsPage } from './pages/SessionsPage';

export default function App() {
  const [activePage, setActivePage] = useState('tasks');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleGoToPomodoro = (taskId) => {
    setSelectedTaskId(taskId);
    setActivePage('sessions');
  };

  const handleNavigate = (page) => {
    // Ao navegar manualmente, limpa a seleção
    if (page !== 'sessions') setSelectedTaskId(null);
    setActivePage(page);
  };

  return (
    <>
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <MobileNav activePage={activePage} onNavigate={handleNavigate} />

      {activePage === 'tasks' && (
        <TasksPage onGoToPomodoro={handleGoToPomodoro} />
      )}
      {activePage === 'projects' && <ProjectsPage />}
      {activePage === 'sessions' && (
        <SessionsPage preSelectedTaskId={selectedTaskId} />
      )}
    </>
  );
}
