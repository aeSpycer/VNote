import { z } from 'zod';

export const signupSchema = z.object({

    username : 
        z.string({ required_error : 'Username is required' }),

    email : 
        z.string({ required_error : 'Email is required' })
        .email({ message : 'Invalid email' }),

    password : 
        z.string({ required_error : 'Password is required' })
        .min(8, { message : 'Password must be at 8 characters'})

});

export const loginSchema = z.object({

    email : 
        z.string({ required_error : 'Email is required' })
        .email({ message : 'Invalid email' }),

    password : 
        z.string({ required_error : 'Password is required' })
        .min(8, { message : 'Password must be at 8 characters'})

});

