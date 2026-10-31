import { StyleSheet } from 'react-native';

import { Fonts } from '@/constants/theme';

export const styles = StyleSheet.create({
    row: { flexDirection: 'row', gap: 12, padding: 12, borderRadius: 14 },
    badge: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    bang: { fontFamily: Fonts.bold, fontSize: 15, lineHeight: 18 },
    info: { flex: 1, gap: 2 },
    name: { fontFamily: Fonts.semibold, fontSize: 14 },
    retry: { fontFamily: Fonts.semibold, marginTop: 6 },
});
