const TABS = [
  { id: 'tasks',    icon: '📝', label: 'Tasks'    },
  { id: 'projects', icon: '📁', label: 'Projetos' },
  { id: 'sessions', icon: '🍅', label: 'Pomodoro' },
];

export function MobileNav({ activePage, onNavigate }) {
  return (
    <div className="mobile-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`mobile-nav-btn${activePage === tab.id ? ' active' : ''}`}
          onClick={() => onNavigate(tab.id)}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
