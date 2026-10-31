export const API_BASE_URL = 'https://api.rupios.app/v1';

export const Endpoints = {
    login: `${API_BASE_URL}/auth/login`,
    accounts: `${API_BASE_URL}/accounts`,
} as const;
