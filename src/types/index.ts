export type AccountKind = 'bank' | 'card';

export type Account = {
    id: string;
    kind: AccountKind;
    name: string;
    tag: string;
    last4: string | null;
    /** Rupees. For cards this is the amount owed. */
    balance: number;
    /** ISO date of the latest balance. */
    balanceAsOf: string;
    openingDate: string;
};

export type NewAccountInput = {
    kind: AccountKind;
    name: string;
    tag: string;
    last4: string | null;
    openingBalance: number;
    openingDate: string;
};

export type User = { id: string; email: string };

export type Session = { token: string; user: User };

export type LoginInput = { email: string; password: string };

export type Category = {
    id: string;
    name: string;
    color: string;
    /** 'user' categories are created by the user; 'system' ones ship with RupiOS. */
    source: 'user' | 'system';
};

export type Transaction = {
    id: string;
    /** ISO date (YYYY-MM-DD). */
    date: string;
    description: string;
    /** Rupees, negative = money out. */
    amount: number;
    categoryId: string | null;
    accountName: string;
    accountLast4: string | null;
};
