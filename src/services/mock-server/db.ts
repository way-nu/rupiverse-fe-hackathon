import { SEED_CATEGORIES, SEED_TRANSACTIONS } from '@/services/mock-server/seed';
import type { Account, Category, Statement, Transaction } from '@/types';

/** In-memory store standing in for the backend database. Resets on app reload. */
export const db: { accounts: Account[]; statements: (Statement & { accountId: string })[]; categories: Category[]; transactions: Transaction[] } = {
    accounts: [],
    statements: [],
    categories: [...SEED_CATEGORIES],
    transactions: [...SEED_TRANSACTIONS],
};
