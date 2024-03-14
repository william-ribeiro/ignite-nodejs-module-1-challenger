/* eslint-disable @typescript-eslint/no-explicit-any */
export class ParseHttpError {
  public readonly message: any
  public readonly statusCode: number

  constructor(message: any, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}
