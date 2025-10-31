export type ResponseType = {
  status: 'success' | 'fail';
  statusCode?: number;
  message: string;
  data?: any;
  error?: any;
  meta?: {
    page?: number;
    limit?: number;
    totalPages?: number;
    count?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
};
