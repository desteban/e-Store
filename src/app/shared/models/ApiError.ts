export interface ApiError {
  message: string;
  statusCode: number;
  timestamp: Date;
  details?: any;
}
