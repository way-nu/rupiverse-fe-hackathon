import type { Category, Transaction } from '@/types';

export const SEED_CATEGORIES: Category[] = [
    { id: 'c-family', name: 'Family', color: '#1F5A50', source: 'user' },
    { id: 'c-work', name: 'Work', color: '#3F5B8A', source: 'user' },
    { id: 'c-split', name: 'Bill split', color: '#6B6B66', source: 'user' },
    { id: 'c-food', name: 'Food', color: '#B5460F', source: 'system' },
    { id: 'c-rent', name: 'Rent', color: '#3F5B8A', source: 'system' },
    { id: 'c-transport', name: 'Transport', color: '#7A3E9D', source: 'system' },
    { id: 'c-bills', name: 'Bills & Utilities', color: '#356648', source: 'system' },
    { id: 'c-subs', name: 'Subscriptions', color: '#7A6418', source: 'system' },
    { id: 'c-shopping', name: 'Shopping', color: '#8A3A52', source: 'system' },
];

const icici = { accountName: 'ICICI Savings', accountLast4: '8830' };
const hdfc = { accountName: 'HDFC Millennia', accountLast4: '4429' };

export const SEED_TRANSACTIONS: Transaction[] = [
    { id: 't1', date: '2026-10-31', description: 'Blue Tokai', amount: -320, categoryId: 'c-food', ...hdfc },
    { id: 't2', date: '2026-10-31', description: 'Uber', amount: -184, categoryId: 'c-transport', ...icici },
    { id: 't3', date: '2026-10-30', description: 'BigBasket', amount: -3460, categoryId: 'c-food', ...icici },
    { id: 't4', date: '2026-10-30', description: 'Aishwarya', amount: 1200, categoryId: 'c-split', ...icici },
    { id: 't5', date: '2026-10-29', description: 'Anthropic', amount: -1660, categoryId: 'c-subs', ...hdfc },
    { id: 't6', date: '2026-10-29', description: 'UPI-48291-RAMESH', amount: -850, categoryId: null, ...icici },
    { id: 't7', date: '2026-10-28', description: 'BESCOM', amount: -2840, categoryId: 'c-bills', ...icici },
];
