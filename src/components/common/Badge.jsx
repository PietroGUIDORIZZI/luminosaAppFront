const STATUS_MAP = {
  TODO:        { label: 'A fazer',      cls: 'badge-gray'   },
  IN_PROGRESS: { label: 'Em progresso', cls: 'badge-yellow' },
  DONE:        { label: 'Concluída',    cls: 'badge-green'  },
};

const PRIORITY_MAP = {
  LOW:    { label: '🟢 Baixa', cls: 'badge-blue'   },
  MEDIUM: { label: '🟡 Média', cls: 'badge-yellow' },
  HIGH:   { label: '🔴 Alta',  cls: 'badge-red'    },
};

export function StatusBadge({ status }) {
  const { label, cls } = STATUS_MAP[status] || { label: status, cls: 'badge-gray' };
  return <span className={`badge ${cls}`}>{label}</span>;
}

export function PriorityBadge({ priority }) {
  const { label, cls } = PRIORITY_MAP[priority] || { label: priority, cls: 'badge-gray' };
  return <span className={`badge ${cls}`}>{label}</span>;
}

export function Badge({ children, variant = 'gray' }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}
