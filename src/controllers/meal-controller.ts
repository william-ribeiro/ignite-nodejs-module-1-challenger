import { NotFoundError } from './../errors/not-found.error'
import { MealsRepository } from '../repositories/meals-repository'
import { UserRepository } from '../repositories/users-repository'
import {
  CreateMealType,
  DeleteMealType,
  GetMealType,
  GetMetricsType,
  UpdateMealType,
} from '../utils/schemas/meal-schema'

const mealRepository = new MealsRepository()
const userRepository = new UserRepository()

async function getUser(userId: string): Promise<boolean> {
  const user = await userRepository.findById(userId)

  if (user) return true

  return false
}

export async function getMetricsByUser(
  userId: string,
): Promise<GetMetricsType | undefined> {
  if (!(await getUser(userId!))) {
    throw new NotFoundError()
  }

  return mealRepository.getMetricsByUserId(userId)
}

export async function getMealController({ id, userId }: GetMealType) {
  if (!(await getUser(userId!))) {
    throw new NotFoundError()
  }

  const meal = await mealRepository.findById({ id, userId })

  if (!meal) {
    throw new NotFoundError()
  }

  return meal
}

export async function getMealsController(userId: string) {
  if (!(await getUser(userId!))) {
    throw new NotFoundError()
  }

  const meals = await mealRepository.findAllByUserId(userId)

  return meals
}

export async function createMealController({
  name,
  description,
  isWihtinTheDiet,
  userId,
}: CreateMealType) {
  if (!(await getUser(userId))) {
    throw new NotFoundError()
  }

  await mealRepository.create({ name, description, isWihtinTheDiet, userId })
}

export async function updateMealController({
  id,
  name,
  description,
  userId,
  isWihtinTheDiet,
}: UpdateMealType) {
  if (!(await getUser(userId!))) {
    throw new NotFoundError()
  }

  const meal = await mealRepository.findById({ id, userId })

  if (!meal) {
    throw new NotFoundError()
  }

  const updateMeal = {
    id,
    name: name ?? meal?.name,
    description: description ?? meal?.description,
    userId: userId ?? meal.user_id,
    isWihtinTheDiet: isWihtinTheDiet ?? meal.is_within_the_diet,
  }

  await mealRepository.update(id, { ...updateMeal })
}

export async function deleteMealController({ id, userId }: DeleteMealType) {
  if (!(await getUser(userId!))) {
    throw new NotFoundError()
  }

  const meal = await mealRepository.findById({ id, userId })

  if (!meal) {
    throw new NotFoundError()
  }

  await mealRepository.delete({ id, userId })
}
