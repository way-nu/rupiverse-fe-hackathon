import { ActivityIndicator, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { styles } from '@/components/button/styles';

type ButtonProps = {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'dashed' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
    compact?: boolean;
};

export function Button({ label, onPress, variant = 'primary', loading, disabled, compact }: ButtonProps) {
    const isPrimary = variant === 'primary';
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={label}
            disabled={disabled || loading}
            onPress={onPress}
            style={({ pressed }) => [
                styles.base,
                compact && styles.compact,
                styles[variant],
                (pressed || disabled) && styles.dim,
            ]}>
            {loading ? (
                <ActivityIndicator color={isPrimary ? Colors.textOnPrimary : Colors.primary} />
            ) : (
                <ThemedText type="button" themeColor={isPrimary ? 'textOnPrimary' : variant === 'ghost' ? 'textSecondary' : 'primary'}>
                    {label}
                </ThemedText>
            )}
        </Pressable>
    );
}
