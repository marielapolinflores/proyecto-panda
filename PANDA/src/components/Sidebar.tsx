import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Dashboard.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar-left">
      <h3>Navegación</h3>
      <nav className="sidebar-nav">
        <NavLink to="/operacion1" className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}>
          📊 LIPPANDAS
        </NavLink>
        <NavLink to="/operacion2" className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}>
          🔢 LIPNUMPY
        </NavLink>
        <NavLink to="/operacion3" className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}>
          📈 REPORTES
        </NavLink>
        <NavLink to="/operacion4" className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}>
          ⚡ PANDAS &amp; NUMPY
        </NavLink>
        <NavLink to="/logout" className="tab-btn btn-logout" style={{ marginTop: '20px', color: '#ff4d4d' }}>
          🚪 Cerrar Sesión
        </NavLink>
      </nav>
    </aside>
  );
};