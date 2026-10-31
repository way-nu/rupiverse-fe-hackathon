import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    fill: { flex: 1 },
    wide: { flex: 1, width: '100%', maxWidth: 560, alignSelf: 'center' },
    header: { paddingHorizontal: Spacing.four, paddingTop: Spacing.three, paddingBottom: Spacing.three },
    content: { paddingHorizontal: Spacing.four, paddingBottom: Spacing.four, gap: Spacing.two },
    section: { paddingTop: Spacing.three, paddingBottom: 6 },
});
