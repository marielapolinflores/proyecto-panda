
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout({onLogout}) {
    return (
        <>
        <Navbar onLogout={onLogout}/>

            <main>
                <Outlet />
            </main>
        <Footer /> 
        </>
    );
}
export default MainLayout;
