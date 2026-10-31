import { describe, expect, test } from '@jest/globals';

import { fetchAccounts, createAccount } from '@/services/accounts';
import { login } from '@/services/auth';
import { createCategory, fetchCategories } from '@/services/categories';
import { formatRupees } from '@/utils/format';
import { importStatement, fetchStatements } from '@/services/statements';
import { fetchTransactions } from '@/services/transactions';
import { fetchTripRecommendations } from '@/services/trips';

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

test('transactions are listed and a new category shows up', async () => {
    const tx = await fetchTransactions(); // accounts exist from the previous test
    expect(tx.length).toBeGreaterThan(0);
    expect(tx.some((t) => t.categoryId === null)).toBe(true);

    await createCategory('Pets');
    const cats = await fetchCategories();
    expect(cats[0]).toMatchObject({ name: 'Pets', source: 'user' });
});

describe('statement import', () => {
    const pdf = (name: string) => ({ name, size: 200000, uri: 'file:///x.pdf', mimeType: 'application/pdf' });

    test('imports into a bank account and a card, updating balances', async () => {
        const [bank, card] = await fetchAccounts();
        const bankRes = await importStatement(bank.id, pdf('HDFC_Sep_2026.pdf'), 'secret');
        expect(bankRes.statement.status).toBe('imported');
        expect(bankRes.transactions.length).toBeGreaterThan(0);
        expect(bankRes.balance.amount).not.toBe(bankRes.balance.previous);

        const cardRes = await importStatement(card.id, pdf('HDFC_Sep_2026.pdf'), 'secret');
        expect(cardRes.balance.amount).toBeGreaterThan(cardRes.balance.previous); // spend raises what is owed

        expect((await fetchStatements(bank.id)).map((s) => s.fileName)).toContain('HDFC_Sep_2026.pdf');
        expect((await fetchAccounts())[0].statementCount).toBe(1);
    });

    test('reports wrong password, unreadable and skipped files', async () => {
        const [bank] = await fetchAccounts();
        await expect(importStatement(bank.id, pdf('a.pdf'), 'wrong')).rejects.toMatchObject({ code: 'WRONG_PASSWORD' });
        await expect(importStatement(bank.id, pdf('scan_1.pdf'), 'secret')).rejects.toMatchObject({ code: 'UNREADABLE_PDF' });
        expect((await importStatement(bank.id, pdf('HDFC_Mar_2026.pdf'), 'secret')).statement.status).toBe('skipped');
    });
});

describe('demo safety', () => {
    test('formats rupees with Indian grouping', () => {
        expect(formatRupees(212340)).toBe('₹2,12,340');
        expect(formatRupees(5968400)).toBe('₹59,68,400');
        expect(formatRupees(999)).toBe('₹999');
        expect(formatRupees(1234.5)).toBe('₹1,234.50');
    });

    test('uploading the same statement twice does not double count', async () => {
        const [, card] = await fetchAccounts();
        const file = { name: 'DUP_Oct_2026.pdf', size: 1000, uri: 'file:///x.pdf', mimeType: 'application/pdf' };
        const first = await importStatement(card.id, file, 'secret');
        const second = await importStatement(card.id, file, 'secret');
        expect(second.statement.status).toBe('skipped');
        expect(second.balance.amount).toBe(first.balance.amount);
    });
});

describe('trip recommendations', () => {
    test('returns source-backed ideas for the requested budget', async () => {
        const res = await fetchTripRecommendations({ origin: 'Bengaluru', tripBudgetINR: 10000, travelers: 2 });
        expect(res.tripBudgetINR).toBe(10000);
        expect(res.results.length).toBeGreaterThan(0);
        expect(res.results.every((r) => r.sourceUrl.startsWith('https://') && r.estimatedCostINR === null)).toBe(true);
        await expect(fetchTripRecommendations({ origin: '', tripBudgetINR: 0 })).rejects.toMatchObject({ code: 'INVALID_REQUEST' });
    });
});
