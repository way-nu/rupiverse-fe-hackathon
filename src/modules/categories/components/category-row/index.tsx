import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { styles } from '@/modules/categories/components/category-row/styles';
import type { Category } from '@/types';

export function CategoryRow({ category, first }: { category: Category; first: boolean }) {
    return (
        <View style={[styles.row, !first && styles.divider]}>
            <View style={[styles.dot, { backgroundColor: category.color }]} />
            <ThemedText style={styles.name}>{category.name}</ThemedText>
            {category.source === 'user' ? (
                <View style={styles.badge}>
                    <ThemedText type="caption" themeColor="primary" style={styles.badgeText}>
                        Yours
                    </ThemedText>
                </View>
            ) : null}
        </View>
    );
}
