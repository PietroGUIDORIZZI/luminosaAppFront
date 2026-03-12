// src/components/LogoutButton.jsx
// Cole este botão em qualquer lugar do app — navbar, sidebar, etc.

import { useAuth } from '../hooks/useAuth';

export function LogoutButton({ className }) {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className={className}
      style={{
        background: 'transparent',
        border: '1px solid #1E1E2E',
        borderRadius: '8px',
        color: '#8888AA',
        padding: '6px 14px',
        fontSize: '13px',
        cursor: 'pointer',
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseOver={e => {
        e.target.style.color = '#FF6B6B';
        e.target.style.borderColor = '#FF6B6B';
      }}
      onMouseOut={e => {
        e.target.style.color = '#8888AA';
        e.target.style.borderColor = '#1E1E2E';
      }}
    >
      Sair
    </button>
  );
}
