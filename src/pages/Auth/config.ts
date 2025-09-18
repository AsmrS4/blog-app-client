import {z} from 'zod';

const passwordValidationRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const authSchema = z.object({
    username: z.string()
        .nonempty({message: 'Поле обязательно к заполнению'})
        .min(3, {message: 'Минимальная длина строки 3 символа'})
        .max(100, {message: 'Максимальная длина строки 100 символов'}),
    password: z.string()
        .min(8, {message: 'Минимальная длина пароля 8 символов'})
        .refine(val => passwordValidationRegex.test(val), {message: 'пароль должен содержать 1 цифру и 1 букву'})
})

export const registerSchema = z.object({
    username: z.string()
        .nonempty({message: 'Поле обязательно к заполнению'})
        .min(3, {message: 'Минимальная длина строки 3 символа'})
        .max(100, {message: 'Максимальная длина строки 100 символов'}),
    password: z.string()
        .min(8, {message: 'Минимальная длина пароля 8 символов'})
        .refine(val => passwordValidationRegex.test(val), {message: 'пароль должен содержать 1 цифру и 1 букву'}),
    confirmPassword: z.string()
        .min(8, {message: 'Повторите пароль'})
})
.refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Введенные пароли не совпадают',
})

export type AuthSchema = z.infer<typeof authSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;