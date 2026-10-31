import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { styles } from '@/components/coming-soon/styles';

export function ComingSoon({ title }: { title: string }) {
    return (
        <ThemedView style={styles.fill}>
            <SafeAreaView style={styles.fill} edges={['top']}>
                <ThemedView style={styles.body}>
                    <ScreenHeader title={title} />
                    <ThemedText themeColor="textSecondary">Coming in the next checkpoint.</ThemedText>
                </ThemedView>
            </SafeAreaView>
        </ThemedView>
    );
}
