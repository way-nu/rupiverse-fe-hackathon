import { Endpoints } from '@/constants/api';
import { db } from '@/services/mock-server/db';
import { ApiError, type MockRoute } from '@/services/mock-server/types';
import type { LoginInput, NewAccountInput, Session } from '@/types';

export const routes: MockRoute[] = [
    {
        method: 'POST',
        url: Endpoints.login,
        handler: ({ body }): Session => {
            const { email, password } = body as LoginInput;
            if (!email || !password) throw new ApiError(400, 'Email and password are required');
            return { token: 'mock-token', user: { id: 'u1', email } };
        },
    },
    {
        method: 'GET',
        url: Endpoints.accounts,
        handler: () => [...db.accounts],
    },
    {
        method: 'POST',
        url: Endpoints.accounts,
        handler: ({ body }) => {
            const input = body as NewAccountInput;
            const account = {
                id: `a${db.accounts.length + 1}`,
                kind: input.kind,
                name: input.name,
                tag: input.tag,
                last4: input.last4,
                balance: input.openingBalance,
                balanceAsOf: input.openingDate,
                openingDate: input.openingDate,
            };
            db.accounts.push(account);
            return account;
        },
    },
];
