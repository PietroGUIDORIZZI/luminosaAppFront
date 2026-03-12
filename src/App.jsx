import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme }            from './context/ThemeContext';
import { Navbar }              from './components/layout/Navbar';
import { MobileNav }           from './components/layout/MobileNav';
import { AnimatedBackground }  from './components/layout/AnimatedBackground';
import { TasksPage }           from './pages/TasksPage';
import { ProjectsPage }        from './pages/ProjectsPage';
import { SessionsPage }        from './pages/SessionsPage';
import { LoginPage }           from './pages/LoginPage';
import { ProtectedRoute }      from './components/ProtectedRoute';

function AppInner() {
  const { dark } = useTheme();
  const [activePage, setActivePage] = useState('tasks');
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
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* App protegido — exige token */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppInner />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
