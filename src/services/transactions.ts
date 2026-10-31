import { Endpoints } from '@/constants/api';
import { http } from '@/services/http-client';
import type { Transaction } from '@/types';

export const setTransactionCategory = (id: string, categoryId: string | null) =>
    http.patch<Transaction>(Endpoints.transaction(id), { categoryId });

export const fetchTransactions = () => http.get<Transaction[]>(Endpoints.transactions);
