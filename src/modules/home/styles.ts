import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    fill: { flex: 1 },
    header: { paddingHorizontal: Spacing.four, paddingTop: Spacing.three, paddingBottom: Spacing.three },
    content: { paddingHorizontal: Spacing.four, paddingBottom: Spacing.four, gap: Spacing.two, width: '100%', maxWidth: 560, alignSelf: 'center' },
    totals: { flexDirection: 'row', marginBottom: Spacing.two },
    total: { flex: 1, gap: 2 },
    sectionGap: { marginTop: Spacing.three },
});
