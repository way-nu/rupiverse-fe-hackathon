import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { styles } from '@/modules/statements/components/upload-zone/styles';

export function UploadZone({ onChoose }: { onChoose: () => void }) {
    return (
        <View style={styles.zone}>
            <View style={styles.icon}>
                <Ionicons name="cloud-upload-outline" size={22} color={Colors.primary} />
            </View>
            <ThemedText type="subtitle" style={{ fontSize: 17 }}>
                Add a PDF statement
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.copy}>
                Bank statements are usually password-protected. You&apos;ll enter the password in the next step.
            </ThemedText>
            <View style={styles.button}>
                <Button label="Choose PDF" compact onPress={onChoose} />
            </View>
        </View>
    );
}
