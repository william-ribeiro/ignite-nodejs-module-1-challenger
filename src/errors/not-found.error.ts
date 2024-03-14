import { ParseHttpError } from './parse-http.errors'

export class NotFoundError extends ParseHttpError {
  constructor() {
    const error = {
      message: 'Not found',
      code: 404,
    }
    super(error, 404)
  }
}
