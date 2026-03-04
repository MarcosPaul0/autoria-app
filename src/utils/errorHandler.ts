import { ApiResponseError } from '@autoria/errors/api-response-error'
import { ToastService } from '@autoria/services/toast-service'
import { HTTP_STATUS } from '@autoria/constants/http-status'
import type { HttpStatus } from '@autoria/constants/http-status'

export function errorHandler(
  error: unknown,
  errorMessages: Record<HttpStatus, string>,
) {
  if (error instanceof ApiResponseError) {
    ToastService.error(errorMessages[error.statusCode as HttpStatus])
  } else {
    ToastService.error(errorMessages[HTTP_STATUS.internal])
  }
}
