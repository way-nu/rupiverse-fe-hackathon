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
    /** Number of statements imported for this account. */
    statementCount: number;
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

export type PickedFile = { name: string; size: number; uri: string; mimeType: string };

export type Statement = {
    id: string;
    fileName: string;
    sizeBytes: number;
    periodStart: string;
    periodEnd: string;
    status: 'imported' | 'skipped';
    transactionsAdded: number;
};

/** Result of importing one statement file. Money is in rupees (the service converts from the wire format). */
export type StatementImport = {
    statement: Statement;
    summary: { transactionsAdded: number; duplicatesIgnored: number; skippedBeforeOpeningDate: number; skipReason: string | null };
    balance: { previous: number; amount: number; asOf: string };
    transactions: Transaction[];
};

/** Contract of the Anakin trip service (anakin/README.md), reached through the app backend. */
export type TripRecommendationInput = {
    origin: string;
    tripBudgetINR: number;
    travelMonth?: string;
    travelers?: number;
    interests?: string[];
};

export type TripResult = {
    title: string;
    snippet: string;
    sourceUrl: string;
    publishedDate: string | null;
    sourceUpdatedAt: string | null;
    /** Always null today: the service never invents prices. */
    estimatedCostINR: number | null;
    budgetFit: 'unverified';
};

export type TripRecommendations = {
    searchId: string | null;
    checkedAt: string;
    origin: string;
    travelMonth: string | null;
    travelers: number;
    tripBudgetINR: number;
    currency: 'INR';
    budgetNotice: string;
    results: TripResult[];
};
