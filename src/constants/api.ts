export const API_BASE_URL = 'https://api.rupios.app/v1';

export const Endpoints = {
    login: `${API_BASE_URL}/auth/login`,
    accounts: `${API_BASE_URL}/accounts`,
    transactions: `${API_BASE_URL}/transactions`,
    categories: `${API_BASE_URL}/categories`,
} as const;
