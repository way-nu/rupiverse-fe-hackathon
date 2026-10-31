import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';

import { useSingleFlight } from '@/hooks/use-single-flight';
import { CATEGORIES_QUERY_KEY, TRANSACTIONS_QUERY_KEY } from '@/constants/query-keys';
import { fetchCategories } from '@/services/categories';
import { fetchTransactions, setTransactionCategory } from '@/services/transactions';
import { formatSignedRupees } from '@/utils/format';

export function useCategorise() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const queryClient = useQueryClient();
    const singleFlight = useSingleFlight();
    const transactions = useQuery({ queryKey: TRANSACTIONS_QUERY_KEY, queryFn: fetchTransactions });
    const categories = useQuery({ queryKey: CATEGORIES_QUERY_KEY, queryFn: fetchCategories });
    const transaction = transactions.data?.find((t) => t.id === id);

    const assign = useMutation({
        mutationFn: (categoryId: string | null) => setTransactionCategory(id, categoryId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
            router.dismiss();
        },
    });

    return {
        title: transaction?.description ?? 'Transaction',
        amount: transaction ? formatSignedRupees(transaction.amount) : '',
        currentId: transaction?.categoryId ?? null,
        categories: categories.data ?? [],
        saving: assign.isPending,
        pick: (categoryId: string) => singleFlight(() => assign.mutateAsync(categoryId).catch(() => undefined)),
        close: () => router.dismiss(),
    };
}
