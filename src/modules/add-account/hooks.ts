import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { useSingleFlight } from '@/hooks/use-single-flight';
import { ACCOUNTS_QUERY_KEY } from '@/constants/query-keys';
import { createAccount } from '@/services/accounts';
import { COPY, DEFAULT_OPENING_DATE } from '@/modules/add-account/constants';
import type { AccountKind } from '@/types';

export function useAddAccount() {
    const { kind: kindParam } = useLocalSearchParams<{ kind?: string }>();
    const kind: AccountKind = kindParam === 'card' ? 'card' : 'bank';
    const copy = COPY[kind];

    const [step, setStep] = useState<1 | 2>(1);
    const [name, setName] = useState('');
    const [tag, setTag] = useState(copy.tags[0]);
    const [customTag, setCustomTag] = useState<string | null>(null);
    const [last4, setLast4] = useState('');
    const [balance, setBalance] = useState('');
    const [date, setDate] = useState(DEFAULT_OPENING_DATE);

    const queryClient = useQueryClient();
    const singleFlight = useSingleFlight();
    const save = useMutation({
        mutationFn: createAccount,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
            router.dismiss();
        },
    });

    const dateValid = /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(new Date(date).getTime());
    const finalTag = customTag !== null ? customTag.trim() || 'Custom' : tag;

    return {
        kind,
        copy,
        step,
        name,
        setName,
        tag,
        pickTag: (t: string) => {
            setTag(t);
            setCustomTag(null);
        },
        customTag,
        setCustomTag,
        last4,
        setLast4: (v: string) => setLast4(v.replace(/\D/g, '').slice(0, 4)),
        balance,
        setBalance: (v: string) => setBalance(v.replace(/[^\d]/g, '')),
        date,
        setDate,
        dateValid,
        finalTag,
        canContinue: name.trim().length > 0,
        next: () => setStep(2),
        back: () => setStep(1),
        close: () => router.dismiss(),
        saving: save.isPending,
        submit: () =>
            singleFlight(() =>
                save
                    .mutateAsync({
                        kind,
                        name: name.trim(),
                        tag: finalTag,
                        last4: last4 || null,
                        openingBalance: Number(balance || 0),
                        openingDate: date,
                    })
                    .catch(() => undefined),
            ),
    };
}
