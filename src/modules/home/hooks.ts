import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';

import { fetchAccounts } from '@/services/accounts';
import { ACCOUNTS_QUERY_KEY } from '@/constants/query-keys';

export function useHome() {
    const { data = [], isLoading } = useQuery({ queryKey: ACCOUNTS_QUERY_KEY, queryFn: fetchAccounts });
    const banks = data.filter((a) => a.kind === 'bank');
    const cards = data.filter((a) => a.kind === 'card');

    return {
        isLoading,
        isEmpty: data.length === 0,
        banks,
        cards,
        inBanks: banks.reduce((sum, a) => sum + a.balance, 0),
        owedOnCards: cards.reduce((sum, a) => sum + a.balance, 0),
        addBank: () => router.push({ pathname: '/add-account', params: { kind: 'bank' } }),
        addCard: () => router.push({ pathname: '/add-account', params: { kind: 'card' } }),
    };
}
