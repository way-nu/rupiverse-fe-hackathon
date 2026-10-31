import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    fill: { flex: 1 },
    header: { paddingHorizontal: Spacing.four, paddingTop: Spacing.three, paddingBottom: Spacing.three },
    content: { paddingHorizontal: Spacing.four, paddingBottom: Spacing.four, gap: Spacing.three, width: '100%', maxWidth: 560, alignSelf: 'center' },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: Spacing.four },
});
