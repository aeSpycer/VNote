import { useForm } from 'react-hook-form';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import '../assets/profile.css';


function Profile() {
    
    const {register, handleSubmit, setValue} = useForm();
    const { user, errors, updateUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {

        setValue('username', user.username);
        setValue('email', user.email);

    }, []);

    const onSubmit = handleSubmit(async data => {

        try {
            const res = await updateUser(user.id, data);

            if (res) navigate(0); // Recarga la página para reflejar los cambios

        } catch (error) {
            console.error("Error updating user: ", error);
        } 
    });

    return (
        <div className="profile-container">

            {errors[0] && <div className='vnote-profile-error'> {errors[0]} </div>}
            
            <form onSubmit={onSubmit}>

                <img src="user.png" alt="Usuraio" className="img-user" />
            
                <input type="text" name="username" { ...register("username") }/>
                <input type="email" name="email" { ...register("email") } />

                <button>Aplicar cambios</button>

            </form>

        </div>
    );
}

export default Profile;