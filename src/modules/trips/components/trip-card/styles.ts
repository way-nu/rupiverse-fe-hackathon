import { StyleSheet } from 'react-native';

import { Fonts, Radius } from '@/constants/theme';

export const styles = StyleSheet.create({
    card: { gap: 8, padding: 14, borderRadius: Radius.large },
    title: { fontFamily: Fonts.semibold },
    footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
    source: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    sourceText: { fontFamily: Fonts.semibold },
});
