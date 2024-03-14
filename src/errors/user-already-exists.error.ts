import { ParseHttpError } from './parse-http.errors'

export class UserAlreadyExistsError extends ParseHttpError {
  constructor() {
    const error = {
      message: 'User already exists',
      code: 409,
    }
    super(error, 409)
  }
}
