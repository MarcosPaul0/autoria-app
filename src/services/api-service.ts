import { API_BASE_URL } from "@autoria/constants/config";
import { ApiResponseError } from "@autoria/errors/api-response-error";

interface RequestOptions extends RequestInit {
	params?: any;
}

class ApiService {
	private baseUrl?: string;
	private headers: HeadersInit = {
		"Content-Type": "application/json",
	};
	private refreshPromise: Promise<void> | null = null;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private async request<T>(
		endpoint: string,
		{ params, ...options }: RequestOptions,
	): Promise<T> {
		if (this.refreshPromise) {
			await this.refreshPromise;
		}

		const isFormData = options.body instanceof FormData;

		const config: RequestInit = {
			...options,
			method: options.method || "GET",
			headers: isFormData
				? options.headers
				: { ...this.headers, ...options.headers },
			body: isFormData ? options.body : JSON.stringify(options.body),
			credentials: "include",
		};

		const searchParams = params ? new URLSearchParams(params) : "";

		const response = await fetch(
			`${this.baseUrl}${endpoint}?${searchParams}`,
			config,
		);

		if (!response.ok) {
			const errorResponse = await response.json();

			throw new ApiResponseError(
				errorResponse.message,
				errorResponse.statusCode,
				endpoint,
			);
		}

		const textResponse = await response.text();
		return Boolean(textResponse) && textResponse.length > 0
			? (JSON.parse(textResponse) as T)
			: (null as T);
	}

	public get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "GET" });
	}

	public post<T>(
		endpoint: string,
		body: any,
		options?: RequestOptions,
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "POST", body });
	}

	public put<T>(
		endpoint: string,
		body: any,
		options?: RequestOptions,
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "PUT", body });
	}

	public patch<T>(
		endpoint: string,
		body?: any,
		options?: RequestOptions,
	): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "PATCH", body });
	}

	public delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "DELETE" });
	}

	public upload<T>(
		endpoint: string,
		formData: FormData,
		onProgress?: (progress: number) => void,
	): Promise<T> {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", `${this.baseUrl}${endpoint}`, true);

			if (onProgress) {
				xhr.upload.onprogress = (event) => {
					if (event.lengthComputable) {
						onProgress((event.loaded / event.total) * 100);
					}
				};
			}

			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					try {
						resolve(JSON.parse(xhr.responseText) as T);
					} catch (error) {
						reject(error);
					}
				} else {
					reject(new Error(`Request failed with status ${xhr.status}`));
				}
			};

			xhr.onerror = () => reject(new Error("Request failed"));
			xhr.send(formData);
		});
	}
}

export const apiClient = new ApiService(API_BASE_URL);
