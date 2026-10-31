import { ScrollView } from 'react-native';

import { Chip } from '@/components/chip';
import { FILTER_ALL, FILTER_UNCATEGORISED } from '@/modules/transactions/constants';
import { styles } from '@/modules/transactions/components/filter-bar/styles';
import type { Category } from '@/types';

type FilterBarProps = {
    selected: string;
    onSelect: (filter: string) => void;
    uncategorisedCount: number;
    categories: (Category | undefined)[];
};

export function FilterBar({ selected, onSelect, uncategorisedCount, categories }: FilterBarProps) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
            <Chip tone="dark" label="All" selected={selected === FILTER_ALL} onPress={() => onSelect(FILTER_ALL)} />
            {uncategorisedCount > 0 ? (
                <Chip
                    dashed
                    label={`Uncategorised · ${uncategorisedCount}`}
                    selected={selected === FILTER_UNCATEGORISED}
                    onPress={() => onSelect(FILTER_UNCATEGORISED)}
                />
            ) : null}
            {categories.map((c) =>
                c ? <Chip tone="dark" key={c.id} label={c.name} selected={selected === c.id} onPress={() => onSelect(c.id)} /> : null,
            )}
        </ScrollView>
    );
}
