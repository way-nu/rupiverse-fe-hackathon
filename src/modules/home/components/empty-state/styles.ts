import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: Spacing.four, paddingBottom: Spacing.six },
    title: { marginTop: Spacing.two },
    copy: { textAlign: 'center', maxWidth: 280 },
    actions: { width: '100%', maxWidth: 420, gap: 10, marginTop: 12 },
});
