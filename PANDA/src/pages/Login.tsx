import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 1. Importamos useNavigate
import '../Login.css';

interface LoginProps {
  onLogin?: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 👈 2. Inicializamos el hook de navegación

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Si tu App pasa un estado global de login, lo ejecutamos:
    if (onLogin) {
      onLogin();
    }

    // Guardamos la sesión en localStorage para mantenerla activa
    localStorage.setItem('isAuthenticated', 'true');

    // 👈 3. Redirigimos explícitamente a la ruta del Dashboard
    navigate('/dashboard'); 
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <p>SISTEMA DE CONTROL & DASHBOARD</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Ingresar ⚡
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;