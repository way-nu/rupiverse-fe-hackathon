import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, Spacing } from '@/constants/theme';

/** Bottom padding so scrollable content clears the native tab bar (safe area + bar height + gap). Web tabs are in flow. */
export function useTabBarPadding() {
    const { bottom } = useSafeAreaInsets();
    return Platform.OS === 'web' ? Spacing.four : bottom + BottomTabInset + Spacing.three;
}
