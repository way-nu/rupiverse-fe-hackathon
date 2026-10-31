import { expect, test } from '@jest/globals';

import { fetchAccounts, createAccount } from '@/services/accounts';
import { login } from '@/services/auth';

const input = { openingDate: '2026-04-01', last4: '1234' };

test('login, add a bank account and a credit card, see both', async () => {
    const session = await login({ email: 'a@b.com', password: 'x' });
    expect(session.token).toBeTruthy();
    const before = await fetchAccounts();
    expect(before).toEqual([]);

    await createAccount({ ...input, kind: 'bank', name: 'HDFC Salary', tag: 'Salary', openingBalance: 212340 });
    await createAccount({ ...input, kind: 'card', name: 'HDFC Millennia', tag: 'Travel', openingBalance: 18430 });

    const accounts = await fetchAccounts();
    expect(accounts).not.toBe(before); // React Query needs a new reference to re-render
    expect(accounts.map((a) => a.kind)).toEqual(['bank', 'card']);
    expect(accounts[1].balance).toBe(18430);
});
