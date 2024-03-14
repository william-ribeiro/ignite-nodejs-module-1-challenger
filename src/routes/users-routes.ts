/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify'
import {
  createUserBodySchema,
  updateUserBodySchema,
} from '../utils/schemas/user-schema'
import {
  createUserController,
  updateUserController,
  signInController,
  deleteUserController,
} from '../controllers/users-controller'
import { parseStatusCodeError } from '../errors/parse-status-code.error'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/signin', async (request, reply) => {
    try {
      const { email, password } = createUserBodySchema
        .omit({ name: true, age: true })
        .parse(request.body)

      const sessionId = await signInController({ email, password })

      reply.setCookie('sessionId', sessionId)

      return reply.status(200).send()
    } catch (err: any | Error) {
      reply.removeHeader('set-cookie')
      const statusCode = parseStatusCodeError(err)

      return reply.status(statusCode).send(err.message)
    }
  })

  app.post('/', async (request, reply) => {
    try {
      const { name, email, age, password } = createUserBodySchema.parse(
        request.body,
      )

      await createUserController({ name, email, age, password })

      return reply.status(201).send()
    } catch (err: any | Error) {
      const statusCode = parseStatusCodeError(err)

      return reply.status(statusCode).send(err.message)
    }
  })

  app.put(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string }
        const { name, email, age, password } = updateUserBodySchema.parse({
          id,
          ...(request.body as { [key: string]: any }),
        })

        await updateUserController({ id, name, email, age, password })

        return reply.status(204).send()
      } catch (err: any | Error) {
        const statusCode = parseStatusCodeError(err)

        return reply.status(statusCode).send(err.message)
      }
    },
  )

  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string }

        await deleteUserController(id)

        return reply.status(204).send()
      } catch (err: any | Error) {
        const statusCode = parseStatusCodeError(err)

        return reply.status(statusCode).send(err.message)
      }
    },
  )
}
