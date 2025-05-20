import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../assets/sign.css';

function SignupPage() {

    const { register, handleSubmit, formState: {errors} } = useForm();

    const { signup, isAuthenticated, errors: signupErrors } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {

        if (isAuthenticated) navigate('/tasks');

    }, [isAuthenticated])

    const onSubmit = handleSubmit(async values => signup(values));

    return (

        <div className='vnote-sign-container'>

            <h1>VNote</h1>

            <div className="vnote-sign-container-2">


                <div className="vnote-sign-banner">

                    {
                        signupErrors.map((error, i) => (
                        <div className='vnote-sign-error' key={i}>
                            {error}
                        </div>
                        ))
                    }
                    
                    <p className="splash-text">Comparte tu conocimiento creando notas!!</p>

                </div>
                
                <div className="vnote-sign-form">

                    <h2>Registrarse</h2>

                    <p> Ya tienes una cuenta? <Link to="/login" className="text-sky-500">Iniciar sesion</Link> </p>
                    <form onSubmit={ onSubmit }>

                        <input type="text" { ...register('username', { required: true }) } placeholder='Nombre de usuario'/>

                        { errors.username && (<p className='text-red-500'>Username is required</p>) }

                        <input type="email" { ...register('email', { required: true }) } placeholder='Correo'/>

                        { errors.email && (<p className='text-red-500'>Email is required</p>) }

                        <input type="password" { ...register('password', { required: true }) } placeholder='Contraseña'/>

                        { errors.password && (<p className='text-red-500'>Password is required</p>) }

                        <button type="submit">Crear cuenta</button>

                    </form>


                </div>

            </div>
        </div>

    );

}

export default SignupPage;