import { StyleSheet } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    scroll: { flexGrow: 0, marginHorizontal: -Spacing.four },
    row: { paddingHorizontal: Spacing.four, gap: Spacing.two },
    chip: {
        height: 40,
        paddingHorizontal: Spacing.three,
        borderRadius: Radius.pill,
        borderWidth: 1,
        borderColor: Colors.borderStrong,
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    selected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.warning },
});
