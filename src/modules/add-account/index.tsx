import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';

import { BankBadge } from '@/components/bank-badge';
import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { useModalPadding } from '@/hooks/use-modal-padding';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useAddAccount } from '@/modules/add-account/hooks';
import { styles } from '@/modules/add-account/styles';

export default function AddAccount() {
    const padding = useModalPadding();
    const a = useAddAccount();
    return (
        <ThemedView type="surface" style={styles.fill}>
            <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerStyle={[styles.content, padding]} keyboardShouldPersistTaps="handled">
                    {a.step === 1 ? (
                        <>
                            <View style={styles.titleRow}>
                                <ThemedText type="subtitle" accessibilityRole="header" style={styles.fill}>
                                    {a.copy.title}
                                </ThemedText>
                                <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={a.close} hitSlop={12}>
                                    <Ionicons name="close" size={20} color={Colors.textSecondary} />
                                </Pressable>
                            </View>
                            <TextField label={a.copy.nameLabel} placeholder={a.copy.namePlaceholder} value={a.name} onChangeText={a.setName} />
                            <View style={styles.tags}>
                                <ThemedText type="small" themeColor="textSecondary">
                                    Tag · pick one
                                </ThemedText>
                                <View style={styles.chips}>
                                    {a.copy.tags.map((t) => (
                                        <Chip key={t} label={t} selected={a.customTag === null && a.tag === t} onPress={() => a.pickTag(t)} />
                                    ))}
                                    <Chip label="+ Custom" dashed selected={a.customTag !== null} onPress={() => a.setCustomTag('')} />
                                </View>
                            </View>
                            {a.customTag !== null ? (
                                <TextField label="Custom tag" placeholder="e.g. Joint" value={a.customTag} onChangeText={a.setCustomTag} />
                            ) : null}
                            <TextField
                                label={a.copy.last4Label}
                                optional
                                hint={a.copy.last4Hint}
                                placeholder={a.copy.last4Placeholder}
                                value={a.last4}
                                onChangeText={a.setLast4}
                                keyboardType="number-pad"
                                maxLength={4}
                                mono
                            />
                            <Button label="Next" onPress={a.next} disabled={!a.canContinue} />
                        </>
                    ) : (
                        <>
                            <View style={styles.header}>
                                <BankBadge name={a.name} kind={a.kind} />
                                <View style={styles.headerText}>
                                    <ThemedText type="subtitle" accessibilityRole="header">
                                        Opening balance
                                    </ThemedText>
                                    <ThemedText type="small" themeColor="textSecondary">
                                        {[a.name, a.finalTag, a.last4 ? `··${a.last4}` : null].filter(Boolean).join(' · ')}
                                    </ThemedText>
                                </View>
                            </View>
                            <TextField
                                label={a.kind === 'card' ? 'Amount owed on that date' : 'Balance on that date'}
                                prefix="₹"
                                placeholder="0"
                                value={a.balance}
                                onChangeText={a.setBalance}
                                keyboardType="number-pad"
                                mono
                            />
                            <TextField
                                label="Balance as of (YYYY-MM-DD)"
                                value={a.date}
                                onChangeText={a.setDate}
                                hint={a.dateValid ? undefined : 'Use the format YYYY-MM-DD, e.g. 2026-04-01'}
                            />
                            <View style={styles.note}>
                                <ThemedText type="small" themeColor="primary">
                                    Only statement transactions after this date are counted, so nothing is counted twice. For a credit card, enter the amount owed.
                                </ThemedText>
                            </View>
                            <View style={styles.actions}>
                                <Button label="Save account" onPress={a.submit} loading={a.saving} disabled={!a.dateValid} />
                                <Button label="Back" variant="ghost" onPress={a.back} />
                            </View>
                        </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    );
}
