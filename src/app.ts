import fastify, { FastifyReply } from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './routes/users-routes'
import { PATHS } from './constants'
import { errorHandler } from './middlewares/error-handler'
import { mealsRoutes } from './routes/meals-routes'

export const app = fastify()

app.register(fastifyCookie, {
  parseOptions: {
    path: '/',
    maxAge: 60 * 60 * 24 * 1, // 1 day
  },
})

app.get(PATHS.HEALTH_CHECK, (_, reply: FastifyReply) =>
  reply.status(200).send({
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'pong_',
    timestamp: new Date().getMilliseconds(),
  }),
)

app.register(usersRoutes, { prefix: PATHS.PREFIX.USERS })
app.register(mealsRoutes, { prefix: PATHS.PREFIX.MEALS })
app.setErrorHandler(errorHandler)
