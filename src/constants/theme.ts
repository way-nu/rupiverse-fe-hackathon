import { Platform } from 'react-native';

export const Colors = {
    text: '#0E0E0C',
    textSecondary: '#5A5A55',
    textOnPrimary: '#FFFFFF',
    background: '#FAFAF7',
    surface: '#FFFFFF',
    backgroundElement: '#F1F0EC',
    backgroundElementText: '#3A3A36',
    border: 'rgba(14,14,12,0.08)',
    borderStrong: 'rgba(14,14,12,0.14)',
    overlay: 'rgba(14,14,12,0.5)',
    primary: '#1F5A50',
    primaryTint: '#E7EFEC',
    danger: '#A02528',
    dangerTint: '#F6E9E7',
    success: '#0E7A3F',
    successTint: '#E8F3EC',
    warning: '#8A5A00',
    warningTint: '#FBF1DC',
} as const;

export type ThemeColor = keyof typeof Colors;

export const Fonts = {
    regular: 'Geist_400Regular',
    medium: 'Geist_500Medium',
    semibold: 'Geist_600SemiBold',
    bold: 'Geist_700Bold',
    mono: 'GeistMono_500Medium',
} as const;

export const Spacing = {
    half: 2,
    one: 4,
    two: 8,
    three: 16,
    four: 24,
    five: 32,
    six: 64,
} as const;

export const Radius = {
    small: 10,
    medium: 12,
    large: 14,
    xlarge: 18,
    sheet: 24,
    pill: 999,
} as const;

export const MaxContentWidth = 800;

/** Height of the native tab bar that content must clear (iOS 50pt, Android 80dp Material 3 bar; web uses in-flow tabs). */
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
