import { StyleSheet } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    fill: { flex: 1 },
    content: { padding: Spacing.four, gap: Spacing.two },
    header: { gap: 2, marginBottom: Spacing.two },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, height: 48 },
    divider: { borderTopWidth: 1, borderTopColor: Colors.border },
    dot: { width: 12, height: 12, borderRadius: 6 },
    name: { flex: 1 },
});
