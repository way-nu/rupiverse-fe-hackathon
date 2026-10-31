import { StyleSheet } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    fill: { flex: 1 },
    content: { padding: Spacing.four, gap: Spacing.three, width: '100%', maxWidth: 560, alignSelf: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
    back: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginLeft: -Spacing.two },
    banner: { padding: Spacing.three, borderRadius: Radius.xlarge, backgroundColor: Colors.successTint, gap: 6 },
    bannerTitle: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    balances: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
    newBalance: { fontSize: 28, lineHeight: 34 },
    oldBalance: { textDecorationLine: 'line-through' },
    list: { gap: 10 },
    actions: { gap: Spacing.two, marginTop: Spacing.two },
});
