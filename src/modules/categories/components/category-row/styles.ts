import { StyleSheet } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

export const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, height: 48 },
    divider: { borderTopWidth: 1, borderTopColor: Colors.border },
    dot: { width: 12, height: 12, borderRadius: 6 },
    name: { flex: 1, fontFamily: Fonts.medium },
    badge: { height: 22, paddingHorizontal: 8, borderRadius: 11, backgroundColor: Colors.primaryTint, justifyContent: 'center' },
    badgeText: { fontFamily: Fonts.semibold },
});
