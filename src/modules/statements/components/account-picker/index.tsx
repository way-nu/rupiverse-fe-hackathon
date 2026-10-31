import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { styles } from '@/modules/statements/components/account-picker/styles';
import type { Account } from '@/types';

type AccountPickerProps = { accounts: Account[]; selectedId: string; onSelect: (id: string) => void };

export function AccountPicker({ accounts, selectedId, onSelect }: AccountPickerProps) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row} style={styles.scroll}>
            {accounts.map((a) => {
                const selected = a.id === selectedId;
                return (
                    <Pressable
                        key={a.id}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        accessibilityLabel={a.name}
                        onPress={() => onSelect(a.id)}
                        style={[styles.chip, selected && styles.selected]}>
                        {selected ? null : a.statementCount > 0 ? (
                            <Ionicons name="checkmark" size={14} color={Colors.success} />
                        ) : (
                            <View style={styles.dot} />
                        )}
                        <ThemedText type="button" style={{ fontSize: 14 }} themeColor={selected ? 'textOnPrimary' : 'text'}>
                            {a.name}
                        </ThemedText>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}
