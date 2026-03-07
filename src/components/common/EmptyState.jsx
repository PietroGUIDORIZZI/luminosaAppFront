export function EmptyState({ icon, text, hint }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon}</div>
      {text}
      {hint && <><br /><small>{hint}</small></>}
    </div>
  );
}
