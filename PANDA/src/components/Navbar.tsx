import { NavLink } from 'react-router-dom';
function Navbar() {
 return (
 <header className="navbar">
 <div className="container navbar-content">
 <h1 className="logo">Mi Proyecto</h1>
 <nav>
 <NavLink to="/dashboard">Dashboard</NavLink>
 </nav>
 </div>
 </header>
 );
}
export default Navbar;