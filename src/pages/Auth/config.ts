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

export type AuthSchema = z.infer<typeof authSchema>;