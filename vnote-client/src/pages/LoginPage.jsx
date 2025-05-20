import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import '../assets/sign.css';

function LoginPage() {

    const { register, handleSubmit, formState: {errors} } = useForm();

    const { signin, errors: signinErrors, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(data => signin(data));

    useEffect(() => {

        if (isAuthenticated) navigate('/tasks');

    }, [isAuthenticated]);

    return (

        <div className='vnote-sign-container'>

            <h1>VNote</h1>
            <div className="vnote-sign-container-2">

                <div className="vnote-sign-banner">

                    {
                        signinErrors.map((error, i) => (
                        <div className='vnote-sign-error' key={i}>
                            {error}
                        </div>
                        ))
                    }

                    <p className="splash-text">Comparte tu conocimiento creando notas!!</p>

                </div>


                <div className="vnote-sign-form">

                    <h2>Iniciar sesion</h2>

                    <p> No tienes una cuenta? <Link to="/signup" className="text-sky-500">Registrarse</Link></p>

                    <form onSubmit={ onSubmit }>

                        <input type="email" { ...register('email', { required: true }) } placeholder='Correo'/>

                        { errors.email && (<p className='text-red-500'>Email is required</p>) }

                        <input type="password" { ...register('password', { required: true }) } placeholder='Contraseña'/>

                        { errors.password && (<p className='text-red-500'>Password is required</p>) }

                        <button type="submit">Iniciar sesion</button>

                    </form>


                </div>
            
            </div>
                
        </div>

    );

}

export default LoginPage;