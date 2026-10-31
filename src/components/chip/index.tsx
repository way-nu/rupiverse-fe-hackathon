import { Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { styles } from '@/components/chip/styles';

type ChipProps = { label: string; onPress: () => void; selected?: boolean; dashed?: boolean; tone?: 'primary' | 'dark' };

export function Chip({ label, onPress, selected, dashed, tone = 'primary' }: ChipProps) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={onPress}
            style={[styles.chip, selected && styles.selected, selected && tone === 'dark' && styles.selectedDark, dashed && styles.dashed]}>
            <ThemedText type="button" style={{ fontSize: 14 }} themeColor={selected ? 'textOnPrimary' : dashed ? 'primary' : 'text'}>
                {label}
            </ThemedText>
        </Pressable>
    );
}
