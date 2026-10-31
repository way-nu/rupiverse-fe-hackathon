import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { styles } from '@/modules/categories/components/add-category-card/styles';

type AddCategoryCardProps = { name: string; onChangeName: (v: string) => void; onAdd: () => void; disabled: boolean; loading: boolean };

export function AddCategoryCard({ name, onChangeName, onAdd, disabled, loading }: AddCategoryCardProps) {
    return (
        <Card style={styles.card}>
            <ThemedText style={styles.title}>New category</ThemedText>
            <TextField label="Name" placeholder="e.g. Pets" value={name} onChangeText={onChangeName} />
            <Button label="Add category" compact onPress={onAdd} disabled={disabled} loading={loading} />
        </Card>
    );
}
