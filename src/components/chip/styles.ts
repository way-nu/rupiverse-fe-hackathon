import { StyleSheet } from 'react-native';

import { Colors, Radius } from '@/constants/theme';

export const styles = StyleSheet.create({
    chip: {
        height: 36,
        paddingHorizontal: 14,
        borderRadius: Radius.pill,
        borderWidth: 1,
        borderColor: Colors.borderStrong,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
    selectedDark: { backgroundColor: Colors.text, borderColor: Colors.text },
    dashed: { borderStyle: 'dashed', borderColor: Colors.primary, backgroundColor: 'transparent' },
});
