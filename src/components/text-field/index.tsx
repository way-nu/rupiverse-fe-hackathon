import { Pressable, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useTextField } from '@/components/text-field/hooks';
import { styles } from '@/components/text-field/styles';

type TextFieldProps = TextInputProps & {
    label: string;
    hint?: string;
    optional?: boolean;
    mono?: boolean;
    prefix?: string;
    revealable?: boolean;
};

export function TextField({ label, hint, optional, mono, prefix, revealable, style, ...input }: TextFieldProps) {
    const { hidden, toggle } = useTextField(revealable);
    return (
        <View style={styles.wrap}>
            <ThemedText type="small" themeColor="textSecondary">
                {label}
                {optional ? ' · optional' : ''}
            </ThemedText>
            <View style={styles.field}>
                {prefix ? <ThemedText themeColor="textSecondary">{prefix}</ThemedText> : null}
                <TextInput
                    {...input}
                    accessibilityLabel={label}
                    secureTextEntry={revealable ? hidden : input.secureTextEntry}
                    placeholderTextColor={Colors.textSecondary}
                    style={[styles.input, mono && styles.mono, style]}
                />
                {revealable ? (
                    <Pressable accessibilityLabel="Show password" onPress={toggle} hitSlop={8}>
                        <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={18} color={Colors.textSecondary} />
                    </Pressable>
                ) : null}
            </View>
            {hint ? (
                <ThemedText type="caption" themeColor="textSecondary">
                    {hint}
                </ThemedText>
            ) : null}
        </View>
    );
}
