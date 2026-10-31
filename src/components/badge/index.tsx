import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { styles } from '@/components/badge/styles';

export function Badge({ label }: { label: string }) {
    return (
        <View style={styles.badge}>
            <ThemedText type="caption" themeColor="backgroundElementText" style={styles.text}>
                {label}
            </ThemedText>
        </View>
    );
}
