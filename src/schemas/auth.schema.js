import { z } from 'zod';

export const signupSchema = z.object({

    username : 
        z.string({ required_error : 'El nombre de usuario es requerido' }),

    email : 
        z.string({ required_error : 'El correo es requerido' })
        .email({ message : 'Correo invalido' }),

    password : 
        z.string({ required_error : 'La contraseña es requerida' })
        .min(8, { message : 'La constraseña debe tener minimo 8 caracteres'})

});

export const loginSchema = z.object({

    email : 
        z.string({ required_error : 'El correo es requerido' })
        .email({ message : 'Correo invalido' }),

    password : 
        z.string({ required_error : 'Password is required' })

});

