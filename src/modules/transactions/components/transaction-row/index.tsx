import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Badge } from '@/components/badge';
import { ThemedText } from '@/components/themed-text';
import { styles } from '@/modules/transactions/components/transaction-row/styles';
import { formatSignedRupees } from '@/utils/format';
import type { Category, Transaction } from '@/types';

type TransactionRowProps = { transaction: Transaction; category?: Category };

export function TransactionRow({ transaction, category }: TransactionRowProps) {
    const isIn = transaction.amount > 0;
    return (
        <View style={styles.row}>
            <View style={[styles.avatar, category ? { backgroundColor: category.color } : styles.avatarEmpty]}>
                <ThemedText type="small" themeColor={category ? 'textOnPrimary' : 'textSecondary'} style={styles.avatarText}>
                    {category ? category.name.slice(0, 2) : '?'}
                </ThemedText>
            </View>
            <View style={styles.info}>
                <ThemedText style={styles.name} numberOfLines={1}>
                    {transaction.description}
                </ThemedText>
                <ThemedText type="caption" themeColor="textSecondary">
                    {transaction.accountName}
                    {transaction.accountLast4 ? ` ··${transaction.accountLast4}` : ''}
                </ThemedText>
                <View style={styles.tags}>
                    {category ? (
                        <Badge label={category.name} />
                    ) : (
                        <Pressable accessibilityRole="link" onPress={() => router.navigate('/categories')} style={styles.categorise}>
                            <ThemedText type="caption" themeColor="primary" style={styles.categoriseText}>
                                + Categorise
                            </ThemedText>
                        </Pressable>
                    )}
                </View>
            </View>
            <ThemedText type="amount" themeColor={isIn ? 'success' : 'text'}>
                {formatSignedRupees(transaction.amount)}
            </ThemedText>
        </View>
    );
}
