import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { styles } from '@/modules/statements/components/imported-list/styles';
import { formatDate } from '@/utils/format';
import type { Statement } from '@/types';

export function ImportedList({ statements }: { statements: Statement[] }) {
    if (!statements.length) return null;
    return (
        <View style={styles.wrap}>
            <ThemedText type="label" themeColor="textSecondary">
                IMPORTED STATEMENTS
            </ThemedText>
            {statements.map((s) => (
                <View key={s.id} style={styles.row}>
                    <View style={styles.icon}>
                        <Ionicons name="document-text-outline" size={18} color={Colors.textSecondary} />
                    </View>
                    <View style={styles.info}>
                        <ThemedText style={styles.name} numberOfLines={1}>
                            {s.fileName}
                        </ThemedText>
                        <ThemedText type="caption" themeColor="textSecondary">
                            {formatDate(s.periodStart)} – {formatDate(s.periodEnd)} · {s.transactionsAdded} transactions
                        </ThemedText>
                    </View>
                    <View style={[styles.badge, s.status === 'skipped' && styles.badgeSkipped]}>
                        <ThemedText type="caption" themeColor={s.status === 'imported' ? 'success' : 'warning'} style={styles.badgeText}>
                            {s.status === 'imported' ? 'Imported' : 'Skipped'}
                        </ThemedText>
                    </View>
                </View>
            ))}
        </View>
    );
}
