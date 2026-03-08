import { StatCard } from '../common/StatCard';

function formatFocusTime(totalMinutes) {
  const totalSecs = totalMinutes * 60;
  const days  = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const mins  = Math.floor((totalSecs % 3600) / 60);
  const secs  = totalSecs % 60;

  if (days > 0)  return `${days}d ${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
  if (mins > 0)  return `${mins}m ${secs}s`;
  return `${secs}s`;
}

export function SessionStats({ stats }) {
  return (
    <div className="stats-grid">
      <StatCard icon="🍅" label="Total"          value={stats.total}                    />
      <StatCard icon="✅" label="Concluídas"     value={stats.completed}                />
      <StatCard icon="⏱️" label="Tempo focado"   value={formatFocusTime(stats.totalMins)} />
    </div>
  );
}
