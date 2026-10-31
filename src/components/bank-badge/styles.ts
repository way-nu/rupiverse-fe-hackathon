import { StyleSheet } from 'react-native';

import { Fonts, Radius } from '@/constants/theme';

export const styles = StyleSheet.create({
    badge: { width: 40, height: 40, borderRadius: Radius.small, alignItems: 'center', justifyContent: 'center' },
    text: { fontFamily: Fonts.semibold, fontSize: 11 },
});
