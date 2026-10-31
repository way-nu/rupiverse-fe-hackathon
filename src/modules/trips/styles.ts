import { StyleSheet } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    fill: { flex: 1 },
    content: { padding: Spacing.four, gap: Spacing.three, width: '100%', maxWidth: 560, alignSelf: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
    back: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginLeft: -Spacing.two },
    form: { gap: Spacing.three },
    notice: { padding: 12, borderRadius: Radius.medium, backgroundColor: Colors.warningTint },
    list: { gap: 10 },
    meta: { gap: 2 },
});
