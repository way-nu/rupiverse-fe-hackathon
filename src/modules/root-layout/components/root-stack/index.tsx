import { Stack } from 'expo-router';

import { useSession } from '@/hooks/use-session';
import { SHEET_DETENTS } from '@/modules/root-layout/constants';

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
                <Stack.Screen
                    name="add-account"
                    options={{ presentation: 'formSheet', sheetAllowedDetents: SHEET_DETENTS, sheetGrabberVisible: true }}
                />
            </Stack.Protected>
        </Stack>
    );
}
