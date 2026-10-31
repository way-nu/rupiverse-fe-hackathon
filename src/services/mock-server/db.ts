import type { Account } from '@/types';

/** In-memory store standing in for the backend database. Resets on app reload. */
export const db: { accounts: Account[] } = { accounts: [] };
