/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify'
import {
  createMealBodySchema,
  getMealBodySchema,
  updateMealBodySchema,
} from '../utils/schemas/meal-schema'
import {
  createMealController,
  deleteMealController,
  getMealController,
  getMealsController,
  getMetricsByUser,
  updateMealController,
} from '../controllers/meal-controller'
import { parseStatusCodeError } from '../errors/parse-status-code.error'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { z } from 'zod'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await checkSessionIdExists(request)
  })

  app.get('/:id/:userId', async (request, reply) => {
    try {
      const { id, userId } = getMealBodySchema.parse(request.params)

      const meal = await getMealController({
        id,
        userId,
      })

      return reply.status(200).send(meal)
    } catch (err: any | Error) {
      const statusCode = parseStatusCodeError(err)

      return reply.status(statusCode).send(err.message)
    }
  })

  app.get('/:userId', async (request, reply) => {
    try {
      const { userId } = z
        .object({ userId: z.string().uuid() })
        .parse(request.params)

      const meals = await getMealsController(userId)

      return reply.status(200).send({ meals })
    } catch (err: any | Error) {
      const statusCode = parseStatusCodeError(err)

      return reply.status(statusCode).send(err.message)
    }
  })

  app.get('/metrics/:userId', async (request, reply) => {
    try {
      const { userId } = z
        .object({ userId: z.string().uuid() })
        .parse(request.params)

      const metrics = await getMetricsByUser(userId)

      return reply.status(200).send({ metrics })
    } catch (err: any | Error) {
      const statusCode = parseStatusCodeError(err)

      return reply.status(statusCode).send(err.message)
    }
  })

  app.post('/', async (request, reply) => {
    try {
      const { name, description, isWihtinTheDiet, userId } =
        createMealBodySchema.parse(request.body)

      await createMealController({ name, description, isWihtinTheDiet, userId })

      return reply.status(201).send()
    } catch (err: any | Error) {
      const statusCode = parseStatusCodeError(err)

      return reply.status(statusCode).send(err.message)
    }
  })

  app.put('/:id/:userId', async (request, reply) => {
    try {
      const { name, id, description, userId, isWihtinTheDiet } =
        updateMealBodySchema.parse({
          ...(request.params as { [key: string]: any }),
          ...(request.body as { [key: string]: any }),
        })

      await updateMealController({
        id,
        isWihtinTheDiet,
        name,
        description,
        userId,
      })

      return reply.status(204).send()
    } catch (err: any | Error) {
      const statusCode = parseStatusCodeError(err)

      return reply.status(statusCode).send(err.message)
    }
  })

  app.delete('/:id/:userId', async (request, reply) => {
    try {
      const { id, userId } = getMealBodySchema.parse(request.params)

      await deleteMealController({ id, userId })

      return reply.status(204).send()
    } catch (err: any | Error) {
      const statusCode = parseStatusCodeError(err)

      return reply.status(statusCode).send(err.message)
    }
  })
}
