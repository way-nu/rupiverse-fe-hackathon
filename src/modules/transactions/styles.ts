import { StyleSheet } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    fill: { flex: 1 },
    wide: { flex: 1, width: '100%', maxWidth: 560, alignSelf: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.four, paddingTop: Spacing.three, paddingBottom: Spacing.three },
    search: { paddingHorizontal: Spacing.four, paddingBottom: Spacing.three },
    sectionHeader: { paddingHorizontal: Spacing.four, paddingTop: Spacing.two, paddingBottom: Spacing.one, backgroundColor: Colors.background },
    list: { paddingBottom: Spacing.four },
    empty: { padding: Spacing.four, alignItems: 'center', gap: Spacing.two },
});
