import { View } from 'react-native';

import { Badge } from '@/components/badge';
import { BankBadge } from '@/components/bank-badge';
import { Card } from '@/components/card';
import { ThemedText } from '@/components/themed-text';
import { styles } from '@/modules/home/components/account-card/styles';
import { formatDate, formatRupees } from '@/utils/format';
import type { Account } from '@/types';

export function AccountCard({ account }: { account: Account }) {
    const isCard = account.kind === 'card';
    return (
        <Card style={styles.card}>
            <View style={styles.top}>
                <BankBadge name={account.name} kind={account.kind} />
                <View style={styles.info}>
                    <ThemedText style={styles.name} numberOfLines={1}>
                        {account.name}
                    </ThemedText>
                    <View style={styles.meta}>
                        <Badge label={account.tag} />
                        {account.last4 ? (
                            <ThemedText type="caption" themeColor="textSecondary">
                                ··{account.last4}
                            </ThemedText>
                        ) : null}
                    </View>
                </View>
                <View style={styles.amount}>
                    <ThemedText type="amount" themeColor={isCard ? 'danger' : 'text'}>
                        {formatRupees(account.balance)}
                    </ThemedText>
                    {isCard ? (
                        <ThemedText type="caption" themeColor="textSecondary">
                            owed
                        </ThemedText>
                    ) : null}
                </View>
            </View>
            <View style={styles.footer}>
                <ThemedText type="caption" themeColor="textSecondary">
                    Balance as of {formatDate(account.balanceAsOf)}
                </ThemedText>
                <ThemedText type="small" themeColor="primary" style={styles.upload}>
                    Upload statement
                </ThemedText>
            </View>
        </Card>
    );
}
