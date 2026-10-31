import { StyleSheet } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: Spacing.four, paddingVertical: 10 },
    avatar: { width: 40, height: 40, borderRadius: Radius.medium, alignItems: 'center', justifyContent: 'center' },
    avatarEmpty: { backgroundColor: Colors.backgroundElement },
    avatarText: { fontFamily: Fonts.semibold },
    info: { flex: 1, gap: 2 },
    name: { fontFamily: Fonts.semibold },
    tags: { flexDirection: 'row', marginTop: 2 },
    categorise: { height: 22, paddingHorizontal: 8, borderRadius: 11, borderWidth: 1, borderStyle: 'dashed', borderColor: Colors.primary, justifyContent: 'center' },
    categoriseText: { fontFamily: Fonts.semibold },
});
