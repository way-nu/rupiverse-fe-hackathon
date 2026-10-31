import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccountCard } from '@/modules/home/components/account-card';
import { EmptyState } from '@/modules/home/components/empty-state';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useTabBarPadding } from '@/hooks/use-tab-bar-padding';
import { useHome } from '@/modules/home/hooks';
import { styles } from '@/modules/home/styles';
import { formatRupees } from '@/utils/format';

export default function Home() {
    const bottomPadding = useTabBarPadding();
    const { isLoading, isEmpty, banks, cards, inBanks, owedOnCards, addBank, addCard, logout, uploadStatement, openTrips } = useHome();
    return (
        <ThemedView style={styles.fill}>
            <SafeAreaView style={styles.fill} edges={['top']}>
                <View style={styles.header}>
                    <ScreenHeader title="Home" />
                    <Pressable accessibilityRole="button" accessibilityLabel="Log out" onPress={logout} hitSlop={12}>
                        <Ionicons name="log-out-outline" size={22} color={Colors.textSecondary} />
                    </Pressable>
                </View>
                {isLoading ? (
                    <ActivityIndicator style={styles.fill} />
                ) : isEmpty ? (
                    <EmptyState onAddBank={addBank} onAddCard={addCard} bottomPadding={bottomPadding} />
                ) : (
                    <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomPadding }]}>
                        <Card style={styles.totals}>
                            <View style={styles.total}>
                                <ThemedText type="caption" themeColor="textSecondary">
                                    In bank accounts
                                </ThemedText>
                                <ThemedText type="amountLarge">{formatRupees(inBanks)}</ThemedText>
                            </View>
                            <View style={styles.total}>
                                <ThemedText type="caption" themeColor="textSecondary">
                                    Owed on cards
                                </ThemedText>
                                <ThemedText type="amountLarge" themeColor="danger">
                                    {formatRupees(owedOnCards)}
                                </ThemedText>
                            </View>
                        </Card>

                        <Pressable accessibilityRole="button" accessibilityLabel="Trips within reach" onPress={openTrips}>
                            <Card style={styles.trips}>
                                <View style={styles.tripsText}>
                                    <ThemedText style={{ fontWeight: '600' }}>Trips within reach</ThemedText>
                                    <ThemedText type="caption" themeColor="textSecondary">
                                        Find trip ideas that fit your budget
                                    </ThemedText>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
                            </Card>
                        </Pressable>

                        <ThemedText type="label" themeColor="textSecondary">
                            BANK ACCOUNTS
                        </ThemedText>
                        {banks.map((a) => (
                            <AccountCard key={a.id} account={a} onUploadStatement={() => uploadStatement(a.id)} />
                        ))}
                        <Button label="+ Add bank account" variant="dashed" compact onPress={addBank} />

                        <ThemedText type="label" themeColor="textSecondary" style={styles.sectionGap}>
                            CREDIT CARDS
                        </ThemedText>
                        {cards.map((a) => (
                            <AccountCard key={a.id} account={a} onUploadStatement={() => uploadStatement(a.id)} />
                        ))}
                        <Button label="+ Add credit card" variant="dashed" compact onPress={addCard} />
                    </ScrollView>
                )}
            </SafeAreaView>
        </ThemedView>
    );
}
