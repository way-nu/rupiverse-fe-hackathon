import { StyleSheet } from 'react-native';

import { Colors, Radius } from '@/constants/theme';

export const styles = StyleSheet.create({
    base: { height: 52, borderRadius: Radius.large, alignItems: 'center', justifyContent: 'center' },
    compact: { height: 48 },
    primary: { backgroundColor: Colors.primary },
    outline: { borderWidth: 1.5, borderColor: Colors.primary },
    dashed: { borderWidth: 1.5, borderColor: Colors.primary, borderStyle: 'dashed' },
    ghost: { height: 44 },
    dim: { opacity: 0.6 },
});
