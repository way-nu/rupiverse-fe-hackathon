import { View } from 'react-native';

import { Card } from '@/components/card';
import { ThemedText } from '@/components/themed-text';
import { styles } from '@/modules/statements/components/account-summary/styles';
import { formatDate, formatRupees } from '@/utils/format';
import type { Account } from '@/types';

export function AccountSummary({ account }: { account: Account }) {
    return (
        <Card style={styles.card}>
            <ThemedText type="caption" themeColor="textSecondary">
                {account.name}
                {account.last4 ? ` · ··${account.last4}` : ''} · tracking from {formatDate(account.openingDate)}
            </ThemedText>
            <View style={styles.row}>
                <ThemedText type="amountLarge" style={styles.amount}>
                    {formatRupees(account.balance)}
                </ThemedText>
                <ThemedText type="caption" themeColor="textSecondary">
                    {account.kind === 'card' ? 'owed' : 'current balance'}
                </ThemedText>
            </View>
        </Card>
    );
}
