import { useState } from 'react';
import { useTheme }           from './context/ThemeContext';
import { Navbar }             from './components/layout/Navbar';
import { MobileNav }          from './components/layout/MobileNav';
import { AnimatedBackground } from './components/layout/AnimatedBackground';
import { TasksPage }          from './pages/TasksPage';
import { ProjectsPage }       from './pages/ProjectsPage';
import { SessionsPage }       from './pages/SessionsPage';
import { LoginPage }          from './pages/LoginPage';

function isAuthenticated() {
  return !!localStorage.getItem('luminosa_token');
}

function AppInner() {
  const { dark } = useTheme();
  const [activePage, setActivePage]     = useState('tasks');
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleGoToPomodoro = (taskId) => {
    setSelectedTaskId(taskId);
    setActivePage('sessions');
  };

  const handleNavigate = (page) => {
    if (page !== 'sessions') setSelectedTaskId(null);
    setActivePage(page);
  };

  return (
    <>
      <AnimatedBackground dark={dark} />
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <MobileNav activePage={activePage} onNavigate={handleNavigate} />
      {activePage === 'tasks'    && <TasksPage onGoToPomodoro={handleGoToPomodoro} />}
      {activePage === 'projects' && <ProjectsPage />}
      {activePage === 'sessions' && <SessionsPage preSelectedTaskId={selectedTaskId} />}
    </>
  );
}

export default function App() {
  if (!isAuthenticated()) {
    return <LoginPage />;
  }
  return <AppInner />;
}
