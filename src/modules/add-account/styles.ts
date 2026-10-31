import { StyleSheet } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    fill: { flex: 1 },
    content: { padding: Spacing.four, gap: 18 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    headerText: { flex: 1 },
    tags: { gap: Spacing.two },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
    note: { padding: 12, borderRadius: Radius.medium, backgroundColor: Colors.primaryTint },
    actions: { gap: Spacing.two },
});
