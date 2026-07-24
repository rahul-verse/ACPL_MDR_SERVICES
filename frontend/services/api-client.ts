import { getApiBaseUrl } from "@/utils/api-url";

const DEFAULT_TIMEOUT_MS = 12_000;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
    });

    if (!response.ok) {
      const message = await readErrorMessage(response);
      throw new ApiError(message, response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("The request timed out. Please try again.");
    }

    throw new ApiError("Network request failed. Check the API connection.");
  } finally {
    window.clearTimeout(timeout);
  }
}

async function readErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as {
      message?: string;
      issues?: { fieldErrors?: Record<string, string[]> };
    };

    if (payload.issues?.fieldErrors) {
      const firstFieldError = Object.values(payload.issues.fieldErrors)
        .flat()
        .find(Boolean);
      if (firstFieldError) return firstFieldError;
    }

    return payload.message ?? "Request failed.";
  } catch {
    return "Request failed.";
  }
}
