export const API_BASE_URL = 'https://api.rupios.app/v1';

export const STATEMENTS_PATTERN = `${API_BASE_URL}/accounts/:accountId/statements`;

export const TRANSACTION_PATTERN = `${API_BASE_URL}/transactions/:id`;

export const Endpoints = {
    login: `${API_BASE_URL}/auth/login`,
    accounts: `${API_BASE_URL}/accounts`,
    transactions: `${API_BASE_URL}/transactions`,
    transaction: (id: string) => TRANSACTION_PATTERN.replace(':id', id),
    categories: `${API_BASE_URL}/categories`,
    statements: (accountId: string) => STATEMENTS_PATTERN.replace(':accountId', accountId),
} as const;
