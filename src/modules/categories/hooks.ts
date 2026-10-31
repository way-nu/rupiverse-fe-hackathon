import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { CATEGORIES_QUERY_KEY } from '@/constants/query-keys';
import { createCategory, fetchCategories } from '@/services/categories';

export function useCategories() {
    const { data = [], isLoading } = useQuery({ queryKey: CATEGORIES_QUERY_KEY, queryFn: fetchCategories });
    const [name, setName] = useState('');
    const queryClient = useQueryClient();

    const add = useMutation({
        mutationFn: createCategory,
        onSuccess: async () => {
            setName('');
            await queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
        },
    });

    const mine = useMemo(() => data.filter((c) => c.source === 'user'), [data]);
    const system = useMemo(() => data.filter((c) => c.source === 'system'), [data]);

    return { isLoading, mine, system, name, setName, canAdd: name.trim().length > 0, adding: add.isPending, add: () => add.mutate(name) };
}
