'use client';
import { usePrivy } from '@privy-io/react-auth';

export default function LoginButton() {
  const { login, logout, authenticated, user } = usePrivy();

  if (authenticated && user) {
    const display = user.email?.address || user.google?.name || 'Usuario';
    return (
      <div className="auth-section">
        <span className="auth-user">{display}</span>
        <button className="nes-btn is-error" onClick={logout} style={{ fontSize: '8px', padding: '4px 8px' }}>
          Salir
        </button>
      </div>
    );
  }

  return (
    <button className="nes-btn is-primary" onClick={login} style={{ fontSize: '10px' }}>
      Iniciar sesión
    </button>
  );
}
