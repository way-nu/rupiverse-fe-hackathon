import { StyleSheet } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    zone: {
        borderWidth: 1.5,
        borderStyle: 'dashed',
        borderColor: 'rgba(14,14,12,0.3)',
        borderRadius: Radius.xlarge,
        paddingVertical: Spacing.four,
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 10,
    },
    icon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
    copy: { textAlign: 'center' },
    button: { marginTop: Spacing.one, minWidth: 160 },
});
