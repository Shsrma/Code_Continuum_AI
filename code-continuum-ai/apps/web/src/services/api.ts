export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'offline';
  service: string;
  version: string;
  environment: string;
  database: 'connected' | 'disconnected';
  uptime_seconds?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  status: string;
  created_at: string;
}

export interface AuthData {
  user: UserProfile;
  token: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
}

const API_BASE_URL = '/api/v1';
const TOKEN_KEY = 'code_continuum_token';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export async function fetchHealthStatus(): Promise<ApiResponse<HealthStatus>> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: {
          code: `HTTP_${response.status}`,
          message: `Server returned status code ${response.status}`,
        },
      };
    }

    return await response.json();
  } catch (err: any) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: err?.message || 'Failed to connect to backend service',
      },
    };
  }
}

export async function registerUser(payload: { email: string; password: string; display_name: string }): Promise<ApiResponse<AuthData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.error || { code: 'REGISTER_FAILED', message: 'Registration failed.' },
      };
    }
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: { code: 'NETWORK_ERROR', message: err?.message || 'Network error during registration' },
    };
  }
}

export async function loginUser(payload: { email: string; password: string }): Promise<ApiResponse<AuthData>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.error || { code: 'LOGIN_FAILED', message: 'Login failed.' },
      };
    }
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: { code: 'NETWORK_ERROR', message: err?.message || 'Network error during login' },
    };
  }
}

export async function fetchCurrentUser(token: string): Promise<ApiResponse<UserProfile>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.error || { code: 'UNAUTHORIZED', message: 'Session expired or invalid.' },
      };
    }
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: { code: 'NETWORK_ERROR', message: err?.message || 'Network error fetching profile' },
    };
  }
}
