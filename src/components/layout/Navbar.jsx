import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useApiStatus } from '../../hooks/useApiStatus';

const TABS = [
  { id: 'tasks',    label: '📝 Tarefas'    },
  { id: 'projects', label: '📁 Projetos' },
  { id: 'sessions', label: '🍅 Pomodoro' },
];

export function Navbar({ activePage, onNavigate }) {
  const { toggleTheme } = useTheme();
  const online = useApiStatus();
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('pt-BR'));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="logo">
          ✨ Luminosa
          <small>{clock}</small>
        </div>

        <div className="nav-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab${activePage === tab.id ? ' active' : ''}`}
              onClick={() => onNavigate(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <div className="api-status">
            <div className={`status-dot${online === true ? ' online' : online === false ? ' offline' : ''}`} />
            <span style={{ color: 'var(--muted)' }}>
              {online === true ? 'Online' : online === false ? 'Offline' : 'API'}
            </span>
          </div>
          <button className="icon-btn" onClick={toggleTheme} title="Alternar tema">🌙</button>
        </div>
      </div>
    </nav>
  );
}
