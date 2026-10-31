import { router } from 'expo-router';
import { useState } from 'react';

import { useStatementImport } from '@/hooks/use-statement-import';
import { formatFileSize } from '@/utils/format';

export function useStatementPassword() {
    const { pending, run } = useStatementImport();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const first = pending[0];
    const extra = pending.length - 1;

    const submit = async () => {
        setLoading(true);
        await run(password);
        setLoading(false);
        router.dismiss();
        router.navigate('/import-results');
    };

    return {
        title: first ? (extra > 0 ? `${first.name} + ${extra} more` : first.name) : 'No file selected',
        detail: first ? `${formatFileSize(pending.reduce((s, f) => s + f.size, 0))} · password protected` : '',
        password,
        setPassword,
        loading,
        canSubmit: pending.length > 0 && password.length > 0,
        submit,
        cancel: () => router.dismiss(),
    };
}
