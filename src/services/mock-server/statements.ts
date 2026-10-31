import { db } from '@/services/mock-server/db';
import { ApiError, type MockRequest } from '@/services/mock-server/types';
import type { PickedFile, Transaction } from '@/types';

/**
 * Mock behaviour, keyed on the upload so every outcome can be demoed:
 *   password "wrong"        -> 422 WRONG_PASSWORD
 *   file name has "scan"    -> 422 UNREADABLE_PDF
 *   file name has "old"/"_mar_" -> 200 skipped (all before the opening date)
 *   anything else           -> imported
 */
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const TEMPLATES: { description: string; paise: number; categoryId: string | null }[] = [
    { description: 'Swiggy', paise: -48000, categoryId: 'food' },
    { description: 'Uber', paise: -21400, categoryId: 'transport' },
    { description: 'Amazon', paise: -349900, categoryId: 'shopping' },
    { description: 'Netflix', paise: -64900, categoryId: 'subscriptions' },
    { description: 'UPI-77120-SURESH', paise: -120000, categoryId: null },
    { description: 'Refund Myntra', paise: 89900, categoryId: 'shopping' },
    { description: 'BESCOM', paise: -284000, categoryId: 'bills' },
    { description: 'Zomato', paise: -73500, categoryId: 'food' },
];

const pad = (n: number) => String(n).padStart(2, '0');

function period(fileName: string) {
    const m = MONTHS.findIndex((mon) => new RegExp(mon, 'i').test(fileName));
    const month = m === -1 ? 8 : m;
    const last = new Date(2026, month + 1, 0).getDate();
    return { month, start: `2026-${pad(month + 1)}-01`, end: `2026-${pad(month + 1)}-${pad(last)}` };
}

export function listStatements({ params }: MockRequest) {
    return db.statements.filter((s) => s.accountId === params?.accountId).reverse();
}

export function importStatement({ params, body }: MockRequest) {
    const account = db.accounts.find((a) => a.id === params?.accountId);
    if (!account) throw new ApiError(404, 'Account not found', 'ACCOUNT_NOT_FOUND');

    const { file, password } = body as { file?: PickedFile; password?: string };
    if (!file) throw new ApiError(400, 'A PDF file is required', 'INVALID_REQUEST');
    if (password === 'wrong') throw new ApiError(422, 'Wrong password', 'WRONG_PASSWORD');
    if (/scan/i.test(file.name)) throw new ApiError(422, 'Could not read this PDF', 'UNREADABLE_PDF');

    const { month, start, end } = period(file.name);
    const id = `st_${db.statements.length + 1}`;
    const base = { id, fileName: file.name, sizeBytes: file.size, periodStart: start, periodEnd: end };

    if (/old|_mar_/i.test(file.name)) {
        db.statements.push({ ...base, accountId: account.id, status: 'skipped', transactionsAdded: 0 });
        return {
            statement: { ...base, status: 'skipped' },
            summary: { transactionsAdded: 0, duplicatesIgnored: 0, skippedBeforeOpeningDate: 38, skipReason: 'ALL_BEFORE_OPENING_DATE' },
            balance: { previousPaise: account.balance * 100, amountPaise: account.balance * 100, asOf: account.balanceAsOf },
            transactions: [],
        };
    }

    const wire = TEMPLATES.filter((t) => account.kind === 'bank' || t.paise < 0 || t.description.startsWith('Refund')).map((t, i) => ({
        id: `tx_${id}_${i}`,
        accountId: account.id,
        date: `2026-${pad(month + 1)}-${pad(2 + i * 3)}`,
        description: t.description,
        amountPaise: t.paise,
        categoryId: t.categoryId,
    }));

    wire.forEach((t) => {
        const tx: Transaction = {
            id: t.id,
            date: t.date,
            description: t.description,
            amount: t.amountPaise / 100,
            categoryId: t.categoryId,
            accountName: account.name,
            accountLast4: account.last4,
        };
        db.transactions.push(tx);
    });

    const previous = account.balance;
    const delta = wire.reduce((sum, t) => sum + t.amountPaise, 0) / 100;
    // Banks hold money (spend lowers it); cards track what is owed (spend raises it).
    account.balance = account.kind === 'bank' ? previous + delta : previous - delta;
    account.balanceAsOf = end;
    account.statementCount += 1;
    db.statements.push({ ...base, accountId: account.id, status: 'imported', transactionsAdded: wire.length });

    return {
        statement: { ...base, status: 'imported' },
        summary: { transactionsAdded: wire.length, duplicatesIgnored: 0, skippedBeforeOpeningDate: 0, skipReason: null },
        balance: { previousPaise: previous * 100, amountPaise: account.balance * 100, asOf: end },
        transactions: wire,
    };
}
