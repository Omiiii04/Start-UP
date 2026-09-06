/**
 * ProjectBridge API Client
 * Centralizes all backend requests — handles auth headers, token refresh, errors.
 */

const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001';

const ACCESS_TOKEN_KEY = 'pb_access_token';

// ── Token storage (sessionStorage — clears on tab close) ──────────────────
export const tokenStore = {
  get: (): string | null => sessionStorage.getItem(ACCESS_TOKEN_KEY),
  set: (token: string) => sessionStorage.setItem(ACCESS_TOKEN_KEY, token),
  clear: () => sessionStorage.removeItem(ACCESS_TOKEN_KEY),
};

// ── Standard API response shape ────────────────────────────────────────────
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: { code: string; message: string };
}

// ── Core fetch wrapper ─────────────────────────────────────────────────────
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenStore.get();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include', // send HttpOnly refresh token cookie
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const body: ApiResponse<T> = await res.json();

  if (!res.ok || !body.success) {
    const msg = body.error?.message || body.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return body.data as T;
}

// ── Auth endpoints ─────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  user: {
    userId: string;
    email: string;
    fullName: string;
    role: string;
    clientCategory?: string;
    institutionOrCompany?: string;
    pictureUrl?: string;
    googleId?: string;
    isActive: boolean;
    createdAt: string;
  };
}

/** Exchange Google id_token for backend JWT */
export async function loginWithGoogle(idToken: string): Promise<AuthTokens> {
  return request<AuthTokens>('/api/v1/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  });
}

/** Use refresh token cookie to get a new access token */
export async function refreshAccessToken(): Promise<{ accessToken: string }> {
  return request<{ accessToken: string }>('/api/v1/auth/refresh', {
    method: 'POST',
  });
}

/** Logout — clears refresh token cookie on server */
export async function logoutFromServer(): Promise<void> {
  await request('/api/v1/auth/logout', { method: 'POST' });
}

// ── User endpoints ─────────────────────────────────────────────────────────

export async function getMe(): Promise<AuthTokens['user']> {
  return request<AuthTokens['user']>('/api/v1/users/me');
}

export async function updateMe(data: Partial<AuthTokens['user']>): Promise<AuthTokens['user']> {
  return request<AuthTokens['user']>('/api/v1/users/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// ── Projects ───────────────────────────────────────────────────────────────

export async function getProjects(filters?: Record<string, string>) {
  const qs = filters ? '?' + new URLSearchParams(filters).toString() : '';
  return request<unknown[]>(`/api/v1/projects${qs}`);
}

export async function getProject(id: string) {
  return request<unknown>(`/api/v1/projects/${id}`);
}

// ── Intake ─────────────────────────────────────────────────────────────────

export async function submitIntake(data: object) {
  return request<{ projectId: string; trackingCode: string; workflowStep: number }>('/api/v1/intake/submit', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getIntakeStatus(trackingCode: string) {
  return request<unknown>(`/api/v1/intake/status/${trackingCode}`);
}

// ── Milestones ─────────────────────────────────────────────────────────────

export async function getMilestones(projectId: string) {
  return request<unknown[]>(`/api/v1/projects/${projectId}/milestones`);
}

// ── Invoices ───────────────────────────────────────────────────────────────

export async function getInvoice(id: string) {
  return request<unknown>(`/api/v1/invoices/${id}`);
}

// ── File uploads ───────────────────────────────────────────────────────────

export async function uploadFile(projectId: string, file: File) {
  const token = tokenStore.get();
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/api/v1/projects/${projectId}/files`, {
    method: 'POST',
    credentials: 'include',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData, // No Content-Type header — browser sets multipart boundary
  });

  const body: ApiResponse<unknown> = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error?.message || `Upload failed (HTTP ${res.status})`);
  }
  return body.data;
}

// ── CRM (admin only) ───────────────────────────────────────────────────────

export async function getCRMStats() {
  return request<unknown>('/api/v1/crm/stats');
}

export async function getCRMInquiries(filters?: Record<string, string>) {
  const qs = filters ? '?' + new URLSearchParams(filters).toString() : '';
  return request<unknown[]>(`/api/v1/crm/inquiries${qs}`);
}
