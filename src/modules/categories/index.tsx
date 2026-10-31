import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AddCategoryCard } from '@/modules/categories/components/add-category-card';
import { CategoryRow } from '@/modules/categories/components/category-row';
import { useTabBarPadding } from '@/hooks/use-tab-bar-padding';
import { useCategories } from '@/modules/categories/hooks';
import { styles } from '@/modules/categories/styles';

export default function Categories() {
    const bottomPadding = useTabBarPadding();
    const c = useCategories();
    return (
        <ThemedView style={styles.fill}>
            <SafeAreaView style={styles.fill} edges={['top']}>
                <View style={styles.wide}>
                    <View style={styles.header}>
                        <ScreenHeader title="Categories" />
                    </View>
                    <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomPadding }]} keyboardShouldPersistTaps="handled">
                        <AddCategoryCard name={c.name} onChangeName={c.setName} onAdd={c.add} disabled={!c.canAdd} loading={c.adding} />
                        {c.isLoading ? (
                            <ActivityIndicator />
                        ) : (
                            <>
                                {c.mine.length ? (
                                    <>
                                        <ThemedText type="label" themeColor="textSecondary" style={styles.section}>
                                            YOURS
                                        </ThemedText>
                                        {c.mine.map((cat, i) => (
                                            <CategoryRow key={cat.id} category={cat} first={i === 0} />
                                        ))}
                                    </>
                                ) : null}
                                <ThemedText type="label" themeColor="textSecondary" style={styles.section}>
                                    FROM RUPIOS
                                </ThemedText>
                                {c.system.map((cat, i) => (
                                    <CategoryRow key={cat.id} category={cat} first={i === 0} />
                                ))}
                            </>
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ThemedView>
    );
}
