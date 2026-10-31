import { View } from 'react-native';

import { AppLogo } from '@/components/app-logo';
import { ThemedText } from '@/components/themed-text';
import { styles } from '@/components/screen-header/styles';

export function ScreenHeader({ title }: { title: string }) {
    return (
        <View style={styles.row}>
            <AppLogo />
            <ThemedText type="heading" accessibilityRole="header">
                {title}
            </ThemedText>
        </View>
    );
}
