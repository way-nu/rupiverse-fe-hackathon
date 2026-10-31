import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { ResultRow } from '@/modules/import-results/components/result-row';
import { useImportResults } from '@/modules/import-results/hooks';
import { styles } from '@/modules/import-results/styles';
import { formatRupees } from '@/utils/format';

export default function ImportResults() {
    const r = useImportResults();
    return (
        <ThemedView style={styles.fill}>
            <SafeAreaView style={styles.fill}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <Pressable accessibilityRole="button" accessibilityLabel="Back to statements" onPress={r.back} style={styles.back}>
                            <Ionicons name="chevron-back" size={22} color={Colors.text} />
                        </Pressable>
                        <ThemedText type="heading" accessibilityRole="header">
                            Import results
                        </ThemedText>
                    </View>

                    {r.summary ? (
                        <View style={styles.banner}>
                            <View style={styles.bannerTitle}>
                                <Ionicons name="checkmark" size={18} color={Colors.success} />
                                <ThemedText type="small" themeColor="success" style={{ fontWeight: '600' }}>
                                    Balance updated · {r.accountName}
                                </ThemedText>
                            </View>
                            <View style={styles.balances}>
                                <ThemedText type="amountLarge" style={styles.newBalance}>
                                    {formatRupees(r.summary.balance)}
                                </ThemedText>
                                <ThemedText type="amount" themeColor="textSecondary" style={styles.oldBalance}>
                                    {formatRupees(r.summary.previous)}
                                </ThemedText>
                            </View>
                            <ThemedText type="small" themeColor="textSecondary">
                                {r.summary.added} transactions added from {r.summary.month}
                            </ThemedText>
                        </View>
                    ) : null}

                    <ThemedText type="label" themeColor="textSecondary">
                        {r.results.length} {r.results.length === 1 ? 'FILE' : 'FILES'}
                    </ThemedText>
                    <View style={styles.list}>
                        {r.results.map((res) => (
                            <ResultRow key={res.file.name} result={res} onRetry={r.canRetry(res) ? () => r.retry(res) : undefined} />
                        ))}
                    </View>

                    <View style={styles.actions}>
                        <Button label="View transactions" onPress={r.viewTransactions} />
                        <Button label="Upload another statement" variant="outline" onPress={r.uploadAnother} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}
