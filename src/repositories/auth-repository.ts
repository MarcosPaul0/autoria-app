import { API_ROUTES } from "@autoria/constants/api-routes";
import { apiClient } from "@autoria/services/api-service";

async function logout() {
	await apiClient.post<void>(API_ROUTES.auth.logout, {});
}

async function verifyAuthentication() {
	await apiClient.get<void>(API_ROUTES.auth.verify);
}

export { verifyAuthentication, logout };
