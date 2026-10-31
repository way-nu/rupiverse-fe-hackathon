import { useQuery } from '@tanstack/react-query';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { useState } from 'react';

import { ACCOUNTS_QUERY_KEY, statementsQueryKey } from '@/constants/query-keys';
import { useStatementImport } from '@/hooks/use-statement-import';
import { fetchAccounts } from '@/services/accounts';
import { fetchStatements } from '@/services/statements';
import type { PickedFile } from '@/types';

export function useStatements() {
    const { data: accounts = [], isLoading } = useQuery({ queryKey: ACCOUNTS_QUERY_KEY, queryFn: fetchAccounts });
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { begin } = useStatementImport();

    const selected = accounts.find((a) => a.id === selectedId) ?? accounts[0];
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
        select: setSelectedId,
        statements: statements.data ?? [],
        choosePdf,
        addAccount: () => router.navigate('/'),
    };
}
