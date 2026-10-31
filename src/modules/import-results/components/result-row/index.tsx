import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { Card } from '@/components/card';
import { ThemedText } from '@/components/themed-text';
import { STATUS_STYLE } from '@/modules/import-results/components/result-row/constants';
import { styles } from '@/modules/import-results/components/result-row/styles';
import type { FileResult } from '@/hooks/use-statement-import';

type ResultRowProps = { result: FileResult; onRetry?: () => void };

export function ResultRow({ result, onRetry }: ResultRowProps) {
    const tone = STATUS_STYLE[result.status];
    return (
        <Card style={styles.row}>
            <View style={[styles.badge, { backgroundColor: tone.background }]}>
                {result.status === 'skipped' ? (
                    <ThemedText style={[styles.bang, { color: tone.color }]}>!</ThemedText>
                ) : (
                    <Ionicons name={tone.icon} size={14} color={tone.color} />
                )}
            </View>
            <View style={styles.info}>
                <ThemedText style={styles.name}>{result.file.name}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                    {result.message}
                </ThemedText>
                {onRetry ? (
                    <Pressable accessibilityRole="button" onPress={onRetry}>
                        <ThemedText type="small" themeColor="primary" style={styles.retry}>
                            Try again
                        </ThemedText>
                    </Pressable>
                ) : null}
            </View>
        </Card>
    );
}

