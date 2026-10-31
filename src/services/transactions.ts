import { Endpoints } from '@/constants/api';
import { http } from '@/services/http-client';
import type { Transaction } from '@/types';

export const fetchTransactions = () => http.get<Transaction[]>(Endpoints.transactions);
