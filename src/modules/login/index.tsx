import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLogin } from '@/modules/login/hooks';
import { styles } from '@/modules/login/styles';

export default function Login() {
    const { email, setEmail, password, setPassword, submit, loading, error } = useLogin();
    return (
        <ThemedView style={styles.fill}>
            <SafeAreaView style={styles.fill}>
                <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                        <View style={styles.brand}>
                            <AppLogo size={64} />
                            <ThemedText style={styles.name}>RupiOS</ThemedText>
                            <ThemedText type="label" themeColor="textSecondary">
                                FINANCES, CHARTED
                            </ThemedText>
                        </View>

                        <View style={styles.intro}>
                            <ThemedText type="title">Welcome back</ThemedText>
                            <ThemedText themeColor="textSecondary">Log in to see all your accounts in one place.</ThemedText>
                        </View>

                        <View style={styles.form}>
                            <TextField
                                label="Email"
                                placeholder="you@example.com"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            <TextField label="Password" placeholder="Your password" value={password} onChangeText={setPassword} revealable />
                            {error ? (
                                <ThemedText type="small" themeColor="danger">
                                    {error}
                                </ThemedText>
                            ) : null}
                        </View>

                        <Button label="Log in" onPress={submit} loading={loading} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ThemedView>
    );
}
