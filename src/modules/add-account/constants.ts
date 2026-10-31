import type { AccountKind } from '@/types';

export const COPY: Record<AccountKind, { title: string; nameLabel: string; namePlaceholder: string; tags: string[]; last4Label: string; last4Placeholder: string; last4Hint: string }> = {
    bank: {
        title: 'Add bank account',
        nameLabel: 'Account name',
        namePlaceholder: 'e.g. HDFC Salary',
        tags: ['Savings', 'Salary', 'Current'],
        last4Label: 'Last 4 digits of account number',
        last4Placeholder: '4521',
        last4Hint: 'Helps you tell similar accounts apart.',
    },
    card: {
        title: 'Add credit card',
        nameLabel: 'Card name',
        namePlaceholder: 'e.g. HDFC Millennia',
        tags: ['Frequently used', 'Online shopping', 'Travel'],
        last4Label: 'Last 4 digits of card number',
        last4Placeholder: '4429',
        last4Hint: 'Helps you tell similar cards apart.',
    },
};

export const DEFAULT_OPENING_DATE = '2026-04-01';
