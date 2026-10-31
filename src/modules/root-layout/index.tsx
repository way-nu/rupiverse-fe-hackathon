import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { SessionProvider } from '@/hooks/use-session';
import { StatementImportProvider } from '@/hooks/use-statement-import';
import { RootStack } from '@/modules/root-layout/components/root-stack';
import { queryClient } from '@/modules/root-layout/constants';
import { useFontsReady } from '@/modules/root-layout/hooks';

export default function RootLayout() {
    const ready = useFontsReady();
    if (!ready) return null;
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <StatementImportProvider>
                        <StatusBar style="dark" />
                        <RootStack />
                    </StatementImportProvider>
                </SessionProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}
