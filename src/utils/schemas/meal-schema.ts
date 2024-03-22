import { z } from 'zod'

export const createMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  userId: z.string().uuid(),
  isWihtinTheDiet: z.boolean(),
})

export type CreateMealType = z.infer<typeof createMealBodySchema>

export const updateMealBodySchema = z.object({
  id: z.coerce.number(),
  userId: z.string().uuid().optional(),
  isWihtinTheDiet: z.boolean().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
})

export type UpdateMealType = z.infer<typeof updateMealBodySchema>

export const getMealBodySchema = updateMealBodySchema.omit({
  isWihtinTheDiet: true,
  name: true,
  description: true,
})

export type GetMealType = z.infer<typeof getMealBodySchema>

export type DeleteMealType = GetMealType

export type GetMetricsType = {
  totalMeals: number
  totalMealsOnDiet: number
  totalMealsOffDiet: number
  bestOnDietSequence: number
}
