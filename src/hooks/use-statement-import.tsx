import { useQueryClient } from '@tanstack/react-query';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { ACCOUNTS_QUERY_KEY, TRANSACTIONS_QUERY_KEY, statementsQueryKey } from '@/constants/query-keys';
import { DEFAULT_IMPORT_ERROR, IMPORT_ERROR_MESSAGES } from '@/constants/statements';
import { importStatement } from '@/services/statements';
import { ApiError } from '@/services/mock-server/types';
import { formatDate, formatMonthYear } from '@/utils/format';
import type { Account, PickedFile, StatementImport } from '@/types';

export type FileResult = {
    file: PickedFile;
    status: 'imported' | 'skipped' | 'failed';
    message: string;
    code?: string;
    transactionsAdded: number;
};

export type ImportSummary = { previous: number; balance: number; added: number; month: string } | null;

type ImportContextValue = {
    accountId: string | null;
    pending: PickedFile[];
    results: FileResult[];
    summary: ImportSummary;
    /** Start a new import (clears results), or retry files from the current one. */
    begin: (accountId: string, files: PickedFile[], options?: { retry?: boolean }) => void;
    run: (password: string) => Promise<void>;
    reset: () => void;
};

const ImportContext = createContext<ImportContextValue | null>(null);

export function StatementImportProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const [accountId, setAccountId] = useState<string | null>(null);
    const [pending, setPending] = useState<PickedFile[]>([]);
    const [results, setResults] = useState<FileResult[]>([]);
    const [imports, setImports] = useState<StatementImport[]>([]);

    const begin = useCallback<ImportContextValue['begin']>((id, files, options) => {
        setAccountId(id);
        setPending(files);
        if (!options?.retry) {
            setResults([]);
            setImports([]);
        }
    }, []);

    const run = useCallback(
        async (password: string) => {
            if (!accountId) return;
            const account = queryClient.getQueryData<Account[]>(ACCOUNTS_QUERY_KEY)?.find((a) => a.id === accountId);
            const done: FileResult[] = [];
            const succeeded: StatementImport[] = [];

            for (const file of pending) {
                try {
                    const res = await importStatement(accountId, file, password);
                    const skipped = res.statement.status === 'skipped';
                    succeeded.push(res);
                    done.push({
                        file,
                        status: skipped ? 'skipped' : 'imported',
                        transactionsAdded: res.summary.transactionsAdded,
                        message: res.summary.skipReason === 'DUPLICATE'
                            ? 'Skipped. This statement was already imported.'
                            : skipped
                            ? `Skipped. All ${res.summary.skippedBeforeOpeningDate} transactions are before your start date, ${formatDate(account?.openingDate ?? res.statement.periodStart)}.`
                            : `Imported · ${res.summary.transactionsAdded} transactions`,
                    });
                } catch (e) {
                    const code = e instanceof ApiError ? e.code : undefined;
                    done.push({ file, status: 'failed', code, transactionsAdded: 0, message: (code && IMPORT_ERROR_MESSAGES[code]) || DEFAULT_IMPORT_ERROR });
                }
            }

            setResults((prev) => [...prev.filter((r) => !done.some((d) => d.file.name === r.file.name)), ...done]);
            setImports((prev) => [...prev, ...succeeded]);
            setPending([]);
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY }),
                queryClient.invalidateQueries({ queryKey: statementsQueryKey(accountId) }),
            ]);
        },
        [accountId, pending, queryClient],
    );

    const reset = useCallback(() => {
        setPending([]);
        setResults([]);
        setImports([]);
    }, []);

    const summary = useMemo<ImportSummary>(() => {
        const real = imports.filter((i) => i.statement.status === 'imported');
        if (!real.length) return null;
        return {
            previous: real[0].balance.previous,
            balance: real[real.length - 1].balance.amount,
            added: real.reduce((s, i) => s + i.summary.transactionsAdded, 0),
            month: formatMonthYear(real[0].statement.periodEnd),
        };
    }, [imports]);

    const value = useMemo(() => ({ accountId, pending, results, summary, begin, run, reset }), [accountId, pending, results, summary, begin, run, reset]);
    return <ImportContext.Provider value={value}>{children}</ImportContext.Provider>;
}

export function useStatementImport() {
    const ctx = useContext(ImportContext);
    if (!ctx) throw new Error('useStatementImport must be used inside StatementImportProvider');
    return ctx;
}
