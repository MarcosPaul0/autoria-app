import { API_ROUTES } from '@autoria/constants/api-routes'
import { apiClient } from '@autoria/services/api-service'

export class AuthRepository {
  static async logout() {
    await apiClient.post<void>(API_ROUTES.auth.logout, {})
  }
}
