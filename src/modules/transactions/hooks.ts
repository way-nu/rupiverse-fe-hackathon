import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';

import { CATEGORIES_QUERY_KEY, TRANSACTIONS_QUERY_KEY } from '@/constants/query-keys';
import { fetchCategories } from '@/services/categories';
import { fetchTransactions } from '@/services/transactions';
import { FILTER_ALL, FILTER_UNCATEGORISED } from '@/modules/transactions/constants';
import { formatDayHeading, formatMonthYear } from '@/utils/format';

export function useTransactions() {
    const tx = useQuery({ queryKey: TRANSACTIONS_QUERY_KEY, queryFn: fetchTransactions });
    const cats = useQuery({ queryKey: CATEGORIES_QUERY_KEY, queryFn: fetchCategories });
    const [filter, setFilter] = useState<string>(FILTER_ALL);
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState('');

    const transactions = useMemo(() => tx.data ?? [], [tx.data]);
    const categories = useMemo(() => cats.data ?? [], [cats.data]);
    const categoryById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);

    const uncategorisedCount = transactions.filter((t) => !t.categoryId).length;

    const filterOptions = useMemo(() => {
        const used = [...new Set(transactions.map((t) => t.categoryId).filter((id): id is string => !!id))];
        return used.map((id) => categoryById.get(id)).filter((c) => !!c);
    }, [transactions, categoryById]);

    const month = useMemo(() => {
        const latest = transactions[0]?.date;
        if (!latest) return null;
        const inMonth = transactions.filter((t) => t.date.slice(0, 7) === latest.slice(0, 7));
        return {
            label: formatMonthYear(latest),
            moneyIn: inMonth.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0),
            moneyOut: inMonth.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0),
        };
    }, [transactions]);

    const sections = useMemo(() => {
        const q = query.trim().toLowerCase();
        const visible = transactions.filter((t) => {
            if (filter === FILTER_UNCATEGORISED && t.categoryId) return false;
            if (filter !== FILTER_ALL && filter !== FILTER_UNCATEGORISED && t.categoryId !== filter) return false;
            return !q || t.description.toLowerCase().includes(q);
        });
        const byDate = new Map<string, typeof visible>();
        visible.forEach((t) => byDate.set(t.date, [...(byDate.get(t.date) ?? []), t]));
        return [...byDate.entries()].map(([date, data]) => ({ title: formatDayHeading(date), data }));
    }, [transactions, filter, query]);

    return {
        isLoading: tx.isLoading || cats.isLoading,
        hasTransactions: transactions.length > 0,
        month,
        sections,
        categoryById,
        filter,
        setFilter,
        filterOptions,
        uncategorisedCount,
        searching,
        toggleSearch: () => {
            setSearching((s) => !s);
            setQuery('');
        },
        query,
        setQuery,
        categorise: (id: string) => router.push({ pathname: '/categorise', params: { id } }),
    };
}
