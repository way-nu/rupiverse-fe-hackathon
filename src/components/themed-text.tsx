import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'heading' | 'subtitle' | 'small' | 'caption' | 'label' | 'button' | 'amount' | 'amountLarge';
    themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
    const theme = useTheme();

    return <Text style={[{ color: theme[themeColor ?? 'text'] }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
    default: { fontFamily: Fonts.regular, fontSize: 15, lineHeight: 21 },
    title: { fontFamily: Fonts.semibold, fontSize: 26, lineHeight: 32, letterSpacing: -0.5 },
    heading: { fontFamily: Fonts.semibold, fontSize: 22, lineHeight: 28, letterSpacing: -0.4 },
    subtitle: { fontFamily: Fonts.semibold, fontSize: 20, lineHeight: 26, letterSpacing: -0.4 },
    small: { fontFamily: Fonts.medium, fontSize: 13, lineHeight: 18 },
    caption: { fontFamily: Fonts.regular, fontSize: 12, lineHeight: 16 },
    label: { fontFamily: Fonts.semibold, fontSize: 12, lineHeight: 16, letterSpacing: 1 },
    button: { fontFamily: Fonts.semibold, fontSize: 15, lineHeight: 20 },
    amount: { fontFamily: Fonts.mono, fontSize: 16, lineHeight: 22 },
    amountLarge: { fontFamily: Fonts.mono, fontSize: 22, lineHeight: 28, letterSpacing: -0.4 },
});
