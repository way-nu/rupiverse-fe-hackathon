import { StyleSheet } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    wrap: { gap: 6 },
    field: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
        paddingHorizontal: 14,
        borderRadius: Radius.medium,
        borderWidth: 1,
        borderColor: Colors.borderStrong,
        backgroundColor: Colors.surface,
    },
    input: { flex: 1, fontFamily: Fonts.regular, fontSize: 15, color: Colors.text, height: '100%', outlineStyle: 'none' } as never,
    mono: { fontFamily: Fonts.mono, letterSpacing: 1.5 },
});
