import { ActivityIndicator, Pressable, SectionList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { FilterBar } from '@/modules/transactions/components/filter-bar';
import { MonthSummary } from '@/modules/transactions/components/month-summary';
import { TransactionRow } from '@/modules/transactions/components/transaction-row';
import { useTabBarPadding } from '@/hooks/use-tab-bar-padding';
import { useTransactions } from '@/modules/transactions/hooks';
import { styles } from '@/modules/transactions/styles';

export default function Transactions() {
    const bottomPadding = useTabBarPadding();
    const t = useTransactions();
    return (
        <ThemedView style={styles.fill}>
            <SafeAreaView style={styles.fill} edges={['top']}>
                <View style={styles.wide}>
                    <View style={styles.header}>
                        <ScreenHeader title="Transactions" />
                        <Pressable accessibilityRole="button" accessibilityLabel="Search transactions" onPress={t.toggleSearch} hitSlop={12}>
                            <Ionicons name={t.searching ? 'close' : 'search'} size={20} color={Colors.text} />
                        </Pressable>
                    </View>
                    {t.searching ? (
                        <View style={styles.search}>
                            <TextField label="Search" placeholder="Merchant or description" value={t.query} onChangeText={t.setQuery} autoFocus />
                        </View>
                    ) : null}
                    {t.isLoading ? (
                        <ActivityIndicator style={styles.fill} />
                    ) : !t.hasTransactions ? (
                        <View style={styles.empty}>
                            <ThemedText type="subtitle">No transactions yet</ThemedText>
                            <ThemedText themeColor="textSecondary">Add an account and upload a statement to see them here.</ThemedText>
                        </View>
                    ) : (
                        <SectionList
                            sections={t.sections}
                            keyExtractor={(item) => item.id}
                            stickySectionHeadersEnabled
                            contentContainerStyle={[styles.list, { paddingBottom: bottomPadding }]}
                            ListHeaderComponent={
                                <>
                                    {t.month ? <MonthSummary {...t.month} /> : null}
                                    <FilterBar
                                        selected={t.filter}
                                        onSelect={t.setFilter}
                                        uncategorisedCount={t.uncategorisedCount}
                                        categories={t.filterOptions}
                                    />
                                </>
                            }
                            renderSectionHeader={({ section }) => (
                                <View style={styles.sectionHeader}>
                                    <ThemedText type="small" themeColor="textSecondary" style={{ fontWeight: '600' }}>
                                        {section.title}
                                    </ThemedText>
                                </View>
                            )}
                            renderItem={({ item }) => <TransactionRow transaction={item} category={item.categoryId ? t.categoryById.get(item.categoryId) : undefined} onCategorise={() => t.categorise(item.id)} />}
                        />
                    )}
                </View>
            </SafeAreaView>
        </ThemedView>
    );
}
