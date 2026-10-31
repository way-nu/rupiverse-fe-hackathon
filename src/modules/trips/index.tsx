import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { TripCard } from '@/modules/trips/components/trip-card';
import { useTrips } from '@/modules/trips/hooks';
import { styles } from '@/modules/trips/styles';
import { formatRupees } from '@/utils/format';

export default function Trips() {
    const t = useTrips();
    return (
        <ThemedView style={styles.fill}>
            <SafeAreaView style={styles.fill}>
                <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                        <View style={styles.header}>
                            <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={t.back} style={styles.back}>
                                <Ionicons name="chevron-back" size={22} color={Colors.text} />
                            </Pressable>
                            <ThemedText type="heading" accessibilityRole="header">
                                Trips within reach
                            </ThemedText>
                        </View>
                        <ThemedText themeColor="textSecondary">Tell us where you are starting from and what you can spend. We search the web for trip ideas that fit.</ThemedText>

                        <View style={styles.form}>
                            <TextField label="Starting from" value={t.origin} onChangeText={t.setOrigin} placeholder="e.g. Bengaluru" />
                            <TextField label="Trip budget (total)" prefix="₹" value={t.budget} onChangeText={t.setBudget} keyboardType="number-pad" mono />
                            <Button label="Find trips" onPress={t.find} loading={t.loading} disabled={!t.canSearch} />
                        </View>

                        {t.error ? (
                            <ThemedText type="small" themeColor="danger">
                                {t.error}
                            </ThemedText>
                        ) : null}

                        {t.data ? (
                            <>
                                <View style={styles.meta}>
                                    <ThemedText type="label" themeColor="textSecondary">
                                        {t.data.results.length} IDEAS · {formatRupees(t.data.tripBudgetINR)} FROM {t.data.origin.toUpperCase()}
                                    </ThemedText>
                                </View>
                                <View style={styles.notice}>
                                    <ThemedText type="small" themeColor="warning">
                                        {t.data.budgetNotice}
                                    </ThemedText>
                                </View>
                                <View style={styles.list}>
                                    {t.data.results.map((r) => (
                                        <TripCard key={r.sourceUrl} result={r} onOpen={() => t.openSource(r.sourceUrl)} />
                                    ))}
                                </View>
                            </>
                        ) : null}
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ThemedView>
    );
}
