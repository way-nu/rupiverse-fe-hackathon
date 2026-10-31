import { View } from 'react-native';
import Svg, { Circle, Ellipse } from 'react-native-svg';

import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';

type AppLogoProps = { size?: number; inverted?: boolean };

export function AppLogo({ size = 28, inverted = false }: AppLogoProps) {
    const fg = inverted ? Colors.primary : Colors.textOnPrimary;
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size * 0.28,
                backgroundColor: inverted ? Colors.primaryTint : Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
            <Svg viewBox="0 0 100 100" width={size} height={size} style={{ position: 'absolute' }}>
                <Ellipse cx={50} cy={50} rx={44} ry={19} transform="rotate(-26 50 50)" fill="none" stroke={fg} strokeOpacity={0.5} strokeWidth={3.5} />
                <Circle cx={85.5} cy={31} r={6} fill={fg} />
            </Svg>
            <ThemedText style={{ color: fg, fontFamily: Fonts.bold, fontSize: size * 0.5, lineHeight: size * 0.6 }}>₹</ThemedText>
        </View>
    );
}
