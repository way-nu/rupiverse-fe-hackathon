import { StyleSheet } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    fill: { flex: 1 },
    content: { padding: Spacing.four, gap: Spacing.three },
    file: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    fileIcon: { width: 40, height: 40, borderRadius: Radius.small, backgroundColor: Colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
    fileInfo: { flex: 1, gap: 2 },
    intro: { gap: 4 },
    actions: { gap: Spacing.two },
});
