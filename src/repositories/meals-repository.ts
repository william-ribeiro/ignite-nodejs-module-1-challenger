import { knex } from '../database'
import { Meal } from '../entities/meal'
import {
  CreateMealType,
  DeleteMealType,
  GetMealType,
  GetMetricsType,
  UpdateMealType,
} from '../utils/schemas/meal-schema'

interface IMealsRepository {
  getMetricsByUserId(userId: string): Promise<GetMetricsType | undefined>
  findAllByUserId(userId: string): Promise<Meal[] | []>
  findById({ id, userId }: GetMealType): Promise<Meal | undefined>
  create(data: CreateMealType): Promise<void>
  update(id: number, data: UpdateMealType): Promise<void>
  delete({ id, userId }: DeleteMealType): Promise<void>
}
export class MealsRepository implements IMealsRepository {
  async getMetricsByUserId(
    userId: string,
  ): Promise<GetMetricsType | undefined> {
    const totalMealsOnDiet = await knex('meals')
      .where({ user_id: userId })
      .andWhere('is_within_the_diet', true)
      .count('id', { as: 'total' })
      .first()

    const totalMealsOffDiet = await knex('meals')
      .where({ user_id: userId })
      .andWhere('is_within_the_diet', false)
      .count('id', { as: 'total' })
      .first()

    const totalMeals = await knex('meals')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')

    const { bestOnDietSequence } = totalMeals.reduce(
      (acc, meal) => {
        if (meal.is_within_the_diet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }

        if (acc.currentSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = acc.currentSequence
        }

        return acc
      },
      { bestOnDietSequence: 0, currentSequence: 0 },
    )

    return {
      totalMeals: totalMeals.length,
      totalMealsOnDiet: Number(totalMealsOnDiet?.total),
      totalMealsOffDiet: Number(totalMealsOffDiet?.total),
      bestOnDietSequence,
    }
  }

  async findAllByUserId(userId: string): Promise<Meal[] | []> {
    return knex('meals').where('user_id', userId).returning('*')
  }

  async findById({ id, userId }: GetMealType): Promise<Meal | undefined> {
    return knex('meals').where({ id }).andWhere('user_id', userId).first()
  }

  async create({
    name,
    description,
    userId,
    isWihtinTheDiet,
  }: CreateMealType): Promise<void> {
    await knex('meals')
      .insert({
        name,
        description,
        user_id: userId,
        is_within_the_diet: isWihtinTheDiet,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .returning('*')
  }

  async update(
    id: number,
    { name, description, userId, isWihtinTheDiet }: UpdateMealType,
  ): Promise<void> {
    await knex('meals').where({ id }).update({
      name,
      description,
      user_id: userId,
      is_within_the_diet: isWihtinTheDiet,
      updated_at: new Date().toISOString(),
    })
  }

  async delete({ id, userId }: DeleteMealType): Promise<void> {
    await knex('meals').where({ id }).andWhere('user_id', userId).delete()
  }
}
