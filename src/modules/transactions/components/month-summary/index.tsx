import { View } from 'react-native';

import { Card } from '@/components/card';
import { ThemedText } from '@/components/themed-text';
import { styles } from '@/modules/transactions/components/month-summary/styles';
import { formatSignedRupees } from '@/utils/format';

type MonthSummaryProps = { label: string; moneyIn: number; moneyOut: number };

export function MonthSummary({ label, moneyIn, moneyOut }: MonthSummaryProps) {
    return (
        <Card style={styles.card}>
            <View style={styles.col}>
                <ThemedText type="caption" themeColor="textSecondary">
                    {label} · in
                </ThemedText>
                <ThemedText type="amountLarge" themeColor="success">
                    {formatSignedRupees(moneyIn)}
                </ThemedText>
            </View>
            <View style={styles.col}>
                <ThemedText type="caption" themeColor="textSecondary">
                    out
                </ThemedText>
                <ThemedText type="amountLarge">{formatSignedRupees(moneyOut)}</ThemedText>
            </View>
        </Card>
    );
}
