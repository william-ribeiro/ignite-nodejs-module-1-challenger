/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'

export const parseStatusCodeError = (err: Error | any) => {
  const statusCode =
    err && err.statusCode
      ? err.statusCode
      : err instanceof z.ZodError
        ? 400
        : 500

  return statusCode
}
