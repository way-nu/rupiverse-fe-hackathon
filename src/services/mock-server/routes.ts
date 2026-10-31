import { Endpoints, STATEMENTS_PATTERN, TRANSACTION_PATTERN } from '@/constants/api';
import { db } from '@/services/mock-server/db';
import { ApiError, type MockRoute } from '@/services/mock-server/types';
import { CATEGORY_COLORS } from '@/services/mock-server/constants';
import fixture from '@/services/mock-server/fixtures/trip-recommendations.json';
import { importStatement, listStatements } from '@/services/mock-server/statements';
import type { Category, LoginInput, NewAccountInput, Session, TripRecommendationInput, TripRecommendations } from '@/types';

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
                statementCount: 0,
            };
            db.accounts.push(account);
            return account;
        },
    },
    {
        method: 'GET',
        url: Endpoints.transactions,
        // Until statements are uploaded (checkpoint 3) there is nothing to show without an account.
        handler: () => (db.accounts.length ? [...db.transactions].sort((a, b) => b.date.localeCompare(a.date)) : []),
    },
    {
        method: 'GET',
        url: Endpoints.categories,
        handler: () => [...db.categories],
    },
    {
        method: 'POST',
        url: Endpoints.categories,
        handler: ({ body }) => {
            const name = ((body as { name?: string }).name ?? '').trim();
            if (!name) throw new ApiError(400, 'Category name is required');
            const category: Category = {
                id: `c-user-${db.categories.length + 1}`,
                name,
                color: CATEGORY_COLORS[db.categories.length % CATEGORY_COLORS.length],
                source: 'user',
            };
            db.categories.unshift(category);
            return category;
        },
    },
    { method: 'GET', url: STATEMENTS_PATTERN, handler: listStatements },
    { method: 'POST', url: STATEMENTS_PATTERN, handler: importStatement },
    {
        method: 'PATCH',
        url: TRANSACTION_PATTERN,
        handler: ({ params, body }) => {
            const tx = db.transactions.find((t) => t.id === params?.id);
            if (!tx) throw new ApiError(404, 'Transaction not found', 'TRANSACTION_NOT_FOUND');
            tx.categoryId = (body as { categoryId: string | null }).categoryId;
            return { ...tx };
        },
    },
    {
        method: 'POST',
        url: Endpoints.tripRecommendations,
        // Replays a real Anakin search captured on 2026-10-31 (origin Bengaluru, budget 10,000). The search itself is not re-run.
        handler: ({ body }): TripRecommendations => {
            const input = body as TripRecommendationInput;
            if (!input?.origin?.trim() || !(input.tripBudgetINR > 0)) throw new ApiError(400, 'origin and tripBudgetINR are required', 'INVALID_REQUEST');
            return {
                ...(fixture as Pick<TripRecommendations, 'searchId' | 'checkedAt' | 'results'>),
                origin: input.origin.trim(),
                travelMonth: input.travelMonth ?? null,
                travelers: input.travelers ?? 1,
                tripBudgetINR: input.tripBudgetINR,
                currency: 'INR',
                budgetNotice: 'Trip ideas are source-backed, but prices and availability have not been verified.',
            };
        },
    },
];
