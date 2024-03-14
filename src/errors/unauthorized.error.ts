import { ParseHttpError } from './parse-http.errors'

export class UnauthorizedError extends ParseHttpError {
  constructor() {
    const error = {
      message: 'Unautorized',
      code: 401,
    }
    super(error, 401)
  }
}
