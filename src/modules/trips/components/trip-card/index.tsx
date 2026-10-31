import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { Badge } from '@/components/badge';
import { Card } from '@/components/card';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { styles } from '@/modules/trips/components/trip-card/styles';
import { cleanSnippet, sourceHost } from '@/utils/text';
import type { TripResult } from '@/types';

export function TripCard({ result, onOpen }: { result: TripResult; onOpen: () => void }) {
    return (
        <Card style={styles.card}>
            <ThemedText style={styles.title} numberOfLines={2}>
                {result.title}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={4}>
                {cleanSnippet(result.snippet)}
            </ThemedText>
            <View style={styles.footer}>
                <Badge label="Price unverified" />
                <Pressable accessibilityRole="link" accessibilityLabel={`Open source ${sourceHost(result.sourceUrl)}`} onPress={onOpen} style={styles.source} hitSlop={8}>
                    <ThemedText type="small" themeColor="primary" style={styles.sourceText}>
                        {sourceHost(result.sourceUrl)}
                    </ThemedText>
                    <Ionicons name="open-outline" size={14} color={Colors.primary} />
                </Pressable>
            </View>
        </Card>
    );
}
