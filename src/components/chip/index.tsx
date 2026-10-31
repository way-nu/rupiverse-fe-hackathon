import { Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { styles } from '@/components/chip/styles';

type ChipProps = { label: string; onPress: () => void; selected?: boolean; dashed?: boolean };

export function Chip({ label, onPress, selected, dashed }: ChipProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={onPress}
            style={[styles.chip, selected && styles.selected, dashed && styles.dashed]}>
            <ThemedText type="button" style={{ fontSize: 14 }} themeColor={selected ? 'textOnPrimary' : dashed ? 'primary' : 'text'}>
                {label}
            </ThemedText>
        </Pressable>
    );
}
