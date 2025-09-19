import z from "zod";

export const postSchema = z.object({
    title: z.string()
        .trim()
        .nonempty({message: 'Поле обязательно к заполнению'})
        .min(1,{message: 'Минимальная длина заголовка 1 символ'})
        .min(100,{message: 'Максимальная длина заголовка 100 символов'}),
    text: z.string()
        .trim()
        .nonempty({message: 'Поле обязательно к заполнению'})
        .min(3,{message: 'Минимальная длина текст 3 символа'})
        
})