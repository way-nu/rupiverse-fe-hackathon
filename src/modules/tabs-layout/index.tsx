import { NativeTabs } from 'expo-router/native-tabs';

import { Colors } from '@/constants/theme';
import { TABS } from '@/modules/tabs-layout/constants';

// iOS 26+ renders the Liquid Glass tab bar automatically; older iOS and Android get their system tab bars.
// Web uses the JS tabs in index.web.tsx.
export default function TabsLayout() {
    return (
        <NativeTabs tintColor={Colors.primary} indicatorColor={Colors.primaryTint}>
            {TABS.map((t) => (
                <NativeTabs.Trigger key={t.name} name={t.name}>
                    <NativeTabs.Trigger.Label>{t.title}</NativeTabs.Trigger.Label>
                    <NativeTabs.Trigger.Icon sf={{ default: t.sf, selected: t.sfSelected }} md={t.md} />
                </NativeTabs.Trigger>
            ))}
        </NativeTabs>
    );
}
