import { useState, useEffect } from 'react';
import { useTheme }           from './context/ThemeContext';
import { Navbar }             from './components/layout/Navbar';
import { MobileNav }          from './components/layout/MobileNav';
import { AnimatedBackground } from './components/layout/AnimatedBackground';
import { TasksPage }          from './pages/TasksPage';
import { ProjectsPage }       from './pages/ProjectsPage';
import { SessionsPage }       from './pages/SessionsPage';
import { LoginPage }          from './pages/LoginPage';

function AppInner({ onLogout }) {
  const { dark } = useTheme();
  const [activePage, setActivePage]         = useState('tasks');
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
      <Navbar activePage={activePage} onNavigate={handleNavigate} onLogout={onLogout} />
      <MobileNav activePage={activePage} onNavigate={handleNavigate} />
      {activePage === 'tasks'    && <TasksPage onGoToPomodoro={handleGoToPomodoro} />}
      {activePage === 'projects' && <ProjectsPage />}
      {activePage === 'sessions' && <SessionsPage preSelectedTaskId={selectedTaskId} />}
    </>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('luminosa_token'));

  // Escuta evento global disparado pelo client.js quando token expira
  useEffect(() => {
    const handler = () => setAuthed(false);
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, []);

  function handleLoginSuccess() {
    setAuthed(true);
  }

  function handleLogout() {
    localStorage.removeItem('luminosa_token');
    setAuthed(false);
  }

  if (!authed) {
    return <LoginPage onSuccess={handleLoginSuccess} />;
  }

  return <AppInner onLogout={handleLogout} />;
}
