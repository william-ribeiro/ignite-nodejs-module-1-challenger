import fastify, { FastifyReply } from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './routes/users-routes'
import { PATHS } from './constants'
import { errorHandler } from './middlewares/error-handler'

export const app = fastify()

app.register(fastifyCookie)

app.get(PATHS.HEALTH_CHECK, (_, reply: FastifyReply) =>
  reply.status(200).send({
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'pong_',
    timestamp: new Date().getMilliseconds(),
  }),
)

app.register(usersRoutes, { prefix: PATHS.PREFIX.USERS })
app.setErrorHandler(errorHandler)
