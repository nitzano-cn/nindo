export interface IHttpResult {
  success: boolean;
  message?: string;
  data?: any;
}

export interface ILocalState {
  state: 'init' | 'loading' | 'error' | 'success'
  message: string | null
}

export interface IPaginationQueryParams {
  q: string
  page: number
  limit: number
  sortBy: string
  desc: boolean
}

export interface IPaginationResponse {
  docs: any[];
  total: number;
  limit: number;
  offset?: number;
  page: number;
  pages: number;
}