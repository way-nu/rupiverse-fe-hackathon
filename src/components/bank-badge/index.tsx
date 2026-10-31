import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useBankBadge } from '@/components/bank-badge/hooks';
import { styles } from '@/components/bank-badge/styles';

export function BankBadge({ name, kind }: { name: string; kind: 'bank' | 'card' }) {
    const { code, color } = useBankBadge(name, kind);
    return (
        <View style={[styles.badge, { backgroundColor: color }]}>
            <ThemedText type="caption" themeColor="textOnPrimary" style={styles.text}>
                {code}
            </ThemedText>
        </View>
    );
}
