import z from 'zod'

export const signupInput = z.object({
    name: z.string(),
    email:z.string().email(),
    password: z.string().min(6)
})

export const signInInput = z.object({
    email:z.string().email(),
    password: z.string().min(6)
})

export const createBlogInput = z.object({
    title: z.string(),
    context: z.string()
})
//type inference zod

export type SignupInput =   z.infer<typeof signupInput>
export type SignInInput = z.infer<typeof signInInput>
export type CreateBlogInput =   z.infer<typeof createBlogInput>