export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string> | string[];
}

export interface ApiHealthResponse {
  status: 'healthy' | 'degraded';
  timestamp: string;
  uptime: number;
  database: {
    connected: boolean;
    host?: string;
    database?: string;
  };
}
