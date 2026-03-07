const STATUS_OPTS = [
  { v: 'all',         l: 'Todos'          },
  { v: 'TODO',        l: 'A fazer'        },
  { v: 'IN_PROGRESS', l: 'Em progresso'   },
  { v: 'DONE',        l: 'Concluídas'     },
];

const SORT_OPTS = [
  { v: 'createdAt_desc', l: '🕒 Mais recentes' },
  { v: 'createdAt_asc',  l: '🕐 Mais antigas'  },
  { v: 'priority',       l: '🔴 Prioridade'    },
  { v: 'title',          l: '🔤 A–Z'           },
  { v: 'status',         l: '📋 Status'        },
  { v: 'pomodoros',      l: '🍅 Pomodoros'     },
];

export function TaskFilters({
  filterStatus, filterProject, search, sortBy,
  projects,
  onStatusChange, onProjectChange, onSearchChange, onSortChange,
}) {
  const projectOpts = [
    { v: 'all', l: 'Todos os projetos' },
    ...projects.map(p => ({ v: String(p.id), l: `${p.icon || '📁'} ${p.name}` })),
  ];

  return (
    <div className="task-filters-wrapper">

      {/* Barra de pesquisa + ordenação */}
      <div className="filters-top">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Pesquisar tarefas..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => onSearchChange('')} title="Limpar">✕</button>
          )}
        </div>

        <div className="sort-box">
          <span className="sort-label">Ordenar</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
          >
            {SORT_OPTS.map(o => (
              <option key={o.v} value={o.v}>{o.l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chips de status + projeto */}
      <div className="filters">
        {STATUS_OPTS.map(o => (
          <button
            key={o.v}
            className={`filter-chip${filterStatus === o.v ? ' active' : ''}`}
            onClick={() => onStatusChange(o.v)}
          >
            {o.l}
          </button>
        ))}
        <span style={{ color: 'var(--border)' }}>│</span>
        {projectOpts.map(o => (
          <button
            key={o.v}
            className={`filter-chip${filterProject === o.v ? ' active' : ''}`}
            onClick={() => onProjectChange(o.v)}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}
