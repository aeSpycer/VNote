import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

import '../assets/nav.css';

function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();
    const location = useLocation();
    const rutaActual = location.pathname;

    // Estado para controlar la clase de fondo de los elementos li
    const [classBgProfile, setClassBgProfile] = useState('nav-li-bg-off');
    const [classBgWall, setClassBgWall] = useState('nav-li-bg-off');
    const [classBgHome, setClassBgHome] = useState('nav-li-bg-off');

    useEffect(() => {

        // Actualizar la clase de fondo del elemento li según la ruta actual

        (rutaActual === '/profile') ? setClassBgProfile('nav-li-bg-on') : setClassBgProfile('nav-li-bg-off');

        (rutaActual === '/add-task') ? setClassBgWall('nav-li-bg-on') : setClassBgWall('nav-li-bg-off');

        (rutaActual === '/tasks') ? setClassBgHome('nav-li-bg-on') : setClassBgHome('nav-li-bg-off');

    }, [rutaActual]); // Se ejecutará cada vez que rutaActual cambie

    /*
    
        <li>Welcome {user.username}</li>

        <li><Link to='/add-task'
        className='bg-indigo-500 px-4 py-1 rounded-sm'>Add Task</Link></li>
                        
    */ 

    return (

        <nav>

            <Link to='/'><h1>VNote</h1></Link>

            <ul className="flex gap-x-2">

                <li className={classBgHome}><Link to='/tasks'>Mis notas</Link></li>
                <li className={classBgWall}><Link to='/add-task'>Crear nota</Link></li>
                <li><Link to='/login' onClick={() => logout()}>Cerrar sesion</Link></li>
                <li className={classBgProfile}><Link to='/profile'><img src="user.png" alt="Perfil" /></Link></li>

                
            </ul>

        </nav>

    );

}

export default Navbar;