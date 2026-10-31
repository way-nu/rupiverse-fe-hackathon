import { Stack } from 'expo-router';

import { useSession } from '@/hooks/use-session';

export function RootStack() {
    const { session } = useSession();
    const signedIn = !!session;
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!signedIn}>
                <Stack.Screen name="login" />
            </Stack.Protected>
            <Stack.Protected guard={signedIn}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="import-results" />
                <Stack.Screen name="trips" />
                <Stack.Screen
                    name="categorise"
                    options={{ presentation: 'modal' }}
                />
                <Stack.Screen
                    name="statement-password"
                    options={{ presentation: 'modal' }}
                />
                <Stack.Screen
                    name="add-account"
                    options={{ presentation: 'modal' }}
                />
            </Stack.Protected>
        </Stack>
    );
}
