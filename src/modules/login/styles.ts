import { StyleSheet } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    fill: { flex: 1 },
    content: { padding: Spacing.four, paddingTop: 64, gap: 28, width: '100%', maxWidth: 480, alignSelf: 'center' },
    brand: { alignItems: 'center', gap: 10 },
    name: { fontFamily: Fonts.semibold, fontSize: 36, lineHeight: 40, letterSpacing: -0.7 },
    intro: { alignItems: 'center', gap: 6 },
    form: { gap: Spacing.three },
});
