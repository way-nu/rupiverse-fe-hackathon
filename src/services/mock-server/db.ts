import { SEED_CATEGORIES, SEED_TRANSACTIONS } from '@/services/mock-server/seed';
import type { Account, Category, Transaction } from '@/types';

/** In-memory store standing in for the backend database. Resets on app reload. */
export const db: { accounts: Account[]; categories: Category[]; transactions: Transaction[] } = {
    accounts: [],
    categories: [...SEED_CATEGORIES],
    transactions: [...SEED_TRANSACTIONS],
};
