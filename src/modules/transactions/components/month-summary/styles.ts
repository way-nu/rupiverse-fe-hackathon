import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
    card: { flexDirection: 'row', marginHorizontal: Spacing.four, marginBottom: Spacing.three },
    col: { flex: 1, gap: 2 },
});
