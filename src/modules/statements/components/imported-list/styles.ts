import { StyleSheet } from 'react-native';

import { Colors, Fonts, Radius } from '@/constants/theme';

export const styles = StyleSheet.create({
    wrap: { gap: 10 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: Radius.large, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
    icon: { width: 36, height: 36, borderRadius: Radius.small, backgroundColor: Colors.backgroundElement, alignItems: 'center', justifyContent: 'center' },
    info: { flex: 1, gap: 2 },
    name: { fontFamily: Fonts.semibold, fontSize: 14 },
    badge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: Colors.successTint },
    badgeSkipped: { backgroundColor: Colors.warningTint },
    badgeText: { fontFamily: Fonts.semibold },
});
