import { useQuery } from '@tanstack/react-query';
import * as DocumentPicker from 'expo-document-picker';
import { router, useLocalSearchParams } from 'expo-router';

import { ACCOUNTS_QUERY_KEY, statementsQueryKey } from '@/constants/query-keys';
import { useStatementImport } from '@/hooks/use-statement-import';
import { fetchAccounts } from '@/services/accounts';
import { fetchStatements } from '@/services/statements';
import type { PickedFile } from '@/types';

export function useStatements() {
    const { data: accounts = [], isLoading } = useQuery({ queryKey: ACCOUNTS_QUERY_KEY, queryFn: fetchAccounts });
    const { begin } = useStatementImport();
    const { accountId } = useLocalSearchParams<{ accountId?: string }>();

    const selected = accounts.find((a) => a.id === accountId) ?? accounts[0];
    const statements = useQuery({
        queryKey: statementsQueryKey(selected?.id ?? ''),
        queryFn: () => fetchStatements(selected.id),
        enabled: !!selected,
    });

    const choosePdf = async () => {
        if (!selected) return;
        const picked = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', multiple: true, copyToCacheDirectory: true });
        if (picked.canceled) return;
        const files: PickedFile[] = picked.assets.map((a) => ({ name: a.name, size: a.size ?? 0, uri: a.uri, mimeType: a.mimeType ?? 'application/pdf' }));
        begin(selected.id, files);
        router.push('/statement-password');
    };

    return {
        isLoading,
        accounts,
        selected,
        select: (id: string) => router.setParams({ accountId: id }),
        statements: statements.data ?? [],
        choosePdf,
        addAccount: () => router.navigate('/'),
    };
}
