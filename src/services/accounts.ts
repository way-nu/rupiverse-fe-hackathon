import { Endpoints } from '@/constants/api';
import { http } from '@/services/http-client';
import type { Account, NewAccountInput } from '@/types';

export const fetchAccounts = () => http.get<Account[]>(Endpoints.accounts);

export const createAccount = (input: NewAccountInput) => http.post<Account>(Endpoints.accounts, input);
