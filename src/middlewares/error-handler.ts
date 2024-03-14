/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError } from 'zod'

import { FastifyReply, FastifyRequest } from 'fastify'
import { ParseHttpError } from '../errors/parse-http.errors'

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: any,
  req: FastifyRequest,
  res: FastifyReply,
) => {
  if (err instanceof ParseHttpError) {
    res.status(err.statusCode)
    res.send({
      message: err.message,
    })
    return
  }

  if (err?.statusCode === 429) {
    res.status(err.statusCode)
    res.send({
      message: err.message,
      date: err.date,
      expiresIn: err.expiresIn,
    })
    return
  }

  if (err instanceof ZodError)
    return res
      .status(400)
      .send({ message: 'Validation error.', error: err.format() })

  res.status(500)
  res.send(err.message)
}
