export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface CustomError extends Error {
  status?: number;
}

export interface RetrieveUserTransactionsParams {
    userId: string;
    page: number;
    pageSize: number;
    query: string;
    accountId?: string;
  }


