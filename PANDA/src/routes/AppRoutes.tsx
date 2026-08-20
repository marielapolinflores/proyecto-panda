import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
// import Operacion1 from '../pages/Operacion1';
// import Operacion2 from '../pages/Operacion2';
// import Operacion3 from '../pages/Operacion3';
// import Operacion4 from '../pages/Operacion4';


function AppRoutes() {

    const [isAuthenticated, setIsAuthenticated] = useState(
      localStorage.getItem("isAuthenticated") === "true"
    );

  return (
    
    <Routes>
      {/* Ruta Pública de Login */}
      <Route 
        path="/login" 
        element={
          <Login 
            onLogin={() => {
              setIsAuthenticated(true);
              localStorage.setItem("isAuthenticated", "true");
            }} 
          />
        } 
      />

      {/* Rutas Protegidas dentro del Layout Principal */}
      {isAuthenticated ? (     
        <Route element={<MainLayout onLogout={() => setIsAuthenticated(false)}/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/operacion1" element={<Operacion1 />} />
          <Route path="/operacion2" element={<Operacion2 />} />
          <Route path="/operacion3" element={<Operacion3 />} />
          <Route path="/operacion4" element={<Operacion4 />} /> */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

export default AppRoutes;