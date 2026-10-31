import { StyleSheet } from 'react-native';

import { Colors, Fonts, Radius } from '@/constants/theme';

export const styles = StyleSheet.create({
    card: { padding: 12, borderRadius: Radius.large, gap: 10 },
    top: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    info: { flex: 1, gap: 3 },
    name: { fontFamily: Fonts.semibold },
    meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    amount: { alignItems: 'flex-end' },
    footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 8 },
    upload: { fontFamily: Fonts.semibold },
});
