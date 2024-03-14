import { FastifyRequest } from 'fastify'
import { UnauthorizedError } from '../errors/unauthorized.error'

export async function checkSessionIdExists(request: FastifyRequest) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    throw new UnauthorizedError()
  }
}
