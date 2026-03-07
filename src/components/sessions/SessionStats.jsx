import { StatCard } from '../common/StatCard';

export function SessionStats({ stats }) {
  return (
    <div className="stats-grid">
      <StatCard icon="🍅" label="Total"          value={stats.total}     />
      <StatCard icon="✅" label="Concluídas"     value={stats.completed} />
      <StatCard icon="⏱️" label="Horas de foco"  value={`${stats.hours}h`} />
    </div>
  );
}
