import {z} from 'zod';

const passwordValidationRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const authSchema = z.object({
    username: z.string()
        .nonempty({message: 'Username is required'})
        .min(3, {message: 'Username min length is 3 characters.'})
        .max(100, {message: 'Username max length is 100 characters.'}),
    password: z.string()
        .min(8, {message: 'Password min length is 8 characters.'})
        .refine(val => passwordValidationRegex.test(val), {message: 'The password must contain at least 1 number and 1 character.'})
})

export type AuthSchema = z.infer<typeof authSchema>;