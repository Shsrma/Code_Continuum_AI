export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'offline';
  service: string;
  version: string;
  environment: string;
  database: 'connected' | 'disconnected';
  uptime_seconds?: number;
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
