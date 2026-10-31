import { View, type ViewProps } from 'react-native';

import { styles } from '@/components/card/styles';

export function Card({ style, ...rest }: ViewProps) {
    return <View style={[styles.card, style]} {...rest} />;
}
