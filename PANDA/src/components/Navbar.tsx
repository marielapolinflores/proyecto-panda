import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar({ onLogout }) {

    const[ boxcerrar , setBoxCerrar ] = useState(false)

    const navigate = useNavigate();

    const Cerrar = () => {
        setBoxCerrar(true)
    }

    const CerrarSesion = () => {
            localStorage.removeItem("isAuthenticated")
            onLogout();
            navigate("/login", { replace:true } )
    }

    const CancelarSesion = () => {
        setBoxCerrar(false)
    }


    return (
        <>  
            <header className="navbar">
                <div className="container navbar-content">

                    <h1 className="logo">Mi Proyecto</h1>

                    <nav>
                        
                        <NavLink to="/home"> Home </NavLink>
                        <NavLink to="/dashboard"> Dashboard </NavLink>
                        
                        <button onClick={Cerrar} className='btncerrar'>Cerar Sesion</button>
                    </nav>

                </div>
            </header>

            { boxcerrar ? 
            <div className='cajaCerrar'>
                <button onClick={CerrarSesion}>Aceptar</button>
                <button onClick={CancelarSesion}>Cancelar</button>
            </div> : ""}
        </>
    );
}
export default Navbar;