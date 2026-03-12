import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './LoginPage.css';

export function LoginPage({ onSuccess }) {
  const [mode, setMode]         = useState('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const { login, register, loading, error } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const success = mode === 'login'
      ? await login(email, password)
      : await register(email, password);

    if (success && onSuccess) onSuccess();
  }

  return (
    <div className="login-bg">
      <div className="login-card">

        <div className="login-logo">
          <span className="login-logo-icon">🔦</span>
          <span className="login-logo-text">Luminosa</span>
        </div>

        <p className="login-tagline">foco é o produto.</p>

        <div className="login-tabs">
          <button
            className={`login-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
            type="button"
          >
            Entrar
          </button>
          <button
            className={`login-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
            type="button"
          >
            Criar conta
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              placeholder={mode === 'register' ? 'Mínimo 6 caracteres' : '••••••••'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-submit" type="submit" disabled={loading}>
            {loading
              ? 'Aguarde...'
              : mode === 'login' ? 'Entrar' : 'Criar conta'
            }
          </button>
        </form>

      </div>
    </div>
  );
}
