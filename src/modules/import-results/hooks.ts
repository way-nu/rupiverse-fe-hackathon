import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';

import { ACCOUNTS_QUERY_KEY } from '@/constants/query-keys';
import { RETRYABLE_CODES } from '@/constants/statements';
import { useStatementImport, type FileResult } from '@/hooks/use-statement-import';
import { fetchAccounts } from '@/services/accounts';

export function useImportResults() {
    const { accountId, results, summary, begin } = useStatementImport();
    const { data: accounts = [] } = useQuery({ queryKey: ACCOUNTS_QUERY_KEY, queryFn: fetchAccounts });
    const account = accounts.find((a) => a.id === accountId);

    return {
        accountName: account?.name ?? '',
        summary,
        results,
        canRetry: (r: FileResult) => r.status === 'failed' && !!r.code && RETRYABLE_CODES.includes(r.code),
        retry: (r: FileResult) => {
            if (!accountId) return;
            begin(accountId, [r.file], { retry: true });
            router.push('/statement-password');
        },
        back: () => router.back(),
        viewTransactions: () => router.dismissTo('/transactions'),
        uploadAnother: () => router.dismissTo('/statements'),
    };
}
