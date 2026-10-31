import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

/** Modal content padding. Android draws modals edge to edge, so it needs the status bar inset; iOS modals sit below it. */
export function useModalPadding() {
    const insets = useSafeAreaInsets();
    return { padding: Spacing.four, paddingTop: Spacing.four + (Platform.OS === 'android' ? insets.top : 0) };
}
