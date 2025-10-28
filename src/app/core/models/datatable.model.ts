export interface DataTableRequest {
  page: number;
  size: number;
  sortBy?: string;
  direction?: 'ASC' | 'DESC';
  filters?: { [key: string]: string };
  search?: string; // 👈 nuevo campo
}

export interface DataTableResponse<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}