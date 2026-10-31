import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useStatementPassword } from '@/modules/statement-password/hooks';
import { styles } from '@/modules/statement-password/styles';

export default function StatementPassword() {
    const p = useStatementPassword();
    return (
        <ThemedView type="surface" style={styles.fill}>
            <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                    <View style={styles.file}>
                        <View style={styles.fileIcon}>
                            <Ionicons name="lock-closed-outline" size={18} color={Colors.primary} />
                        </View>
                        <View style={styles.fileInfo}>
                            <ThemedText style={{ fontWeight: '600' }} numberOfLines={1}>
                                {p.title}
                            </ThemedText>
                            <ThemedText type="caption" themeColor="textSecondary">
                                {p.detail}
                            </ThemedText>
                        </View>
                    </View>
                    <View style={styles.intro}>
                        <ThemedText type="subtitle" accessibilityRole="header">
                            Unlock this statement
                        </ThemedText>
                        <ThemedText themeColor="textSecondary">Enter the password your bank set for this PDF.</ThemedText>
                    </View>
                    <TextField
                        label="PDF password"
                        placeholder="Enter password"
                        value={p.password}
                        onChangeText={p.setPassword}
                        revealable
                        autoCapitalize="none"
                        hint="Often your date of birth or PAN, depending on the bank. It's only used to open this file."
                    />
                    <View style={styles.actions}>
                        <Button label="Unlock & import" onPress={p.submit} loading={p.loading} disabled={!p.canSubmit} />
                        <Button label="Cancel" variant="ghost" onPress={p.cancel} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    );
}
