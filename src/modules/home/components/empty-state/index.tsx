import { View } from 'react-native';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { styles } from '@/modules/home/components/empty-state/styles';

type EmptyStateProps = { onAddBank: () => void; onAddCard: () => void };

export function EmptyState({ onAddBank, onAddCard }: EmptyStateProps) {
    return (
        <View style={styles.wrap}>
            <AppLogo size={72} inverted />
            <ThemedText type="heading" style={styles.title}>
                Add your first account
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.copy}>
                Add a bank account or credit card, then upload its statements to start tracking.
            </ThemedText>
            <View style={styles.actions}>
                <Button label="+ Add bank account" onPress={onAddBank} />
                <Button label="+ Add credit card" variant="outline" onPress={onAddCard} />
            </View>
        </View>
    );
}
