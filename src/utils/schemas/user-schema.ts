import { z } from 'zod'

export const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().positive(),
  password: z.string(),
})

export type CreateUserType = z.infer<typeof createUserBodySchema>

const signInType = createUserBodySchema.omit({ name: true, age: true })
export type SignInType = z.infer<typeof signInType>

export const updateUserBodySchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  age: z.number().optional(),
  password: z.string().optional(),
  sessionId: z.string().optional(),
})

export type UpdateUserType = z.infer<typeof updateUserBodySchema>
