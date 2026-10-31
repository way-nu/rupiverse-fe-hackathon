import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { useModalPadding } from '@/hooks/use-modal-padding';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useCategorise } from '@/modules/categorise/hooks';
import { styles } from '@/modules/categorise/styles';

export default function Categorise() {
    const padding = useModalPadding();
    const c = useCategorise();
    return (
        <ThemedView type="surface" style={styles.fill}>
            <ScrollView contentContainerStyle={[styles.content, padding]}>
                <View style={styles.header}>
                    <ThemedText type="subtitle" accessibilityRole="header">
                        Choose a category
                    </ThemedText>
                    <ThemedText themeColor="textSecondary">
                        {c.title} · {c.amount}
                    </ThemedText>
                </View>
                {c.categories.map((cat, i) => (
                    <Pressable
                        key={cat.id}
                        accessibilityRole="button"
                        accessibilityLabel={cat.name}
                        disabled={c.saving}
                        onPress={() => c.pick(cat.id)}
                        style={[styles.row, i > 0 && styles.divider]}>
                        <View style={[styles.dot, { backgroundColor: cat.color }]} />
                        <ThemedText style={styles.name}>{cat.name}</ThemedText>
                        {cat.id === c.currentId ? <Ionicons name="checkmark" size={18} color={Colors.primary} /> : null}
                    </Pressable>
                ))}
                <Button label="Cancel" variant="ghost" onPress={c.close} />
            </ScrollView>
        </ThemedView>
    );
}
