import type { HttpStatus } from '@autoria/constants/http-status'

export class ApiResponseError extends Error {
  public statusCode: HttpStatus
  public endpoint: string

  constructor(message: string, statusCode: HttpStatus, endpoint: string) {
    super(message)

    this.statusCode = statusCode
    this.endpoint = endpoint
  }
}
