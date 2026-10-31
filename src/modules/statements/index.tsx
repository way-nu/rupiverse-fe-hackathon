import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AccountPicker } from '@/modules/statements/components/account-picker';
import { AccountSummary } from '@/modules/statements/components/account-summary';
import { ImportedList } from '@/modules/statements/components/imported-list';
import { UploadZone } from '@/modules/statements/components/upload-zone';
import { useTabBarPadding } from '@/hooks/use-tab-bar-padding';
import { useStatements } from '@/modules/statements/hooks';
import { styles } from '@/modules/statements/styles';

export default function Statements() {
    const bottomPadding = useTabBarPadding();
    const s = useStatements();
    return (
        <ThemedView style={styles.fill}>
            <SafeAreaView style={styles.fill} edges={['top']}>
                <View style={styles.header}>
                    <ScreenHeader title="Upload statements" />
                </View>
                {s.isLoading ? (
                    <ActivityIndicator style={styles.fill} />
                ) : !s.selected ? (
                    <View style={styles.empty}>
                        <ThemedText type="subtitle">Add an account first</ThemedText>
                        <ThemedText themeColor="textSecondary" style={{ textAlign: 'center' }}>
                            Statements are uploaded against a bank account or credit card.
                        </ThemedText>
                        <Button label="Go to Home" onPress={s.addAccount} />
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomPadding }]}>
                        <AccountPicker accounts={s.accounts} selectedId={s.selected.id} onSelect={s.select} />
                        <AccountSummary account={s.selected} />
                        <UploadZone onChoose={s.choosePdf} />
                        <ImportedList statements={s.statements} />
                    </ScrollView>
                )}
            </SafeAreaView>
        </ThemedView>
    );
}
