import { StatCard } from '../common/StatCard';

export function TaskStats({ stats }) {
  return (
    <div className="stats-grid">
      <StatCard icon="📋" label="Total"        value={stats.total}     />
      <StatCard icon="✅" label="Concluídas"   value={stats.done}      />
      <StatCard icon="⚡" label="Em progresso" value={stats.inProg}    />
      <StatCard icon="🍅" label="Pomodoros"    value={stats.pomodoros} />
    </div>
  );
}
