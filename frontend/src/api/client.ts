import type {
  ApiError,
  EvidenceRequest,
  EvidenceResponse,
  HealthResponse,
  ScenariosResponse,
  ValidateMessageRequest,
  ValidateMessageResponse,
} from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://localhost:3000';

class HttpError extends Error {
  status: number;
  details: Record<string, unknown> | null;

  constructor(message: string, status: number, details: Record<string, unknown> | null = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const apiError = data as ApiError | null;
    throw new HttpError(
      apiError?.error?.message || `Request failed with status ${response.status}`,
      response.status,
      apiError?.error?.details || null,
    );
  }

  return data as T;
}

export async function getHealth(): Promise<HealthResponse> {
  return request<HealthResponse>('/api/health', { method: 'GET' });
}

export async function getScenarios(): Promise<ScenariosResponse> {
  return request<ScenariosResponse>('/api/scenarios', { method: 'GET' });
}

export async function validateMessage(payload: ValidateMessageRequest): Promise<ValidateMessageResponse> {
  return request<ValidateMessageResponse>('/api/validate-message', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function generateEvidence(payload: EvidenceRequest): Promise<EvidenceResponse> {
  return request<EvidenceResponse>('/api/evidence', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export { HttpError, API_BASE_URL };