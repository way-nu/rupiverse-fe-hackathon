import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { Colors, Fonts } from '@/constants/theme';
import { TABS } from '@/modules/tabs-layout/constants';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textSecondary,
                tabBarStyle: { backgroundColor: Colors.surface, borderTopColor: Colors.border },
                tabBarLabelStyle: { fontFamily: Fonts.semibold, fontSize: 11 },
            }}>
            {TABS.map((t) => (
                <Tabs.Screen
                    key={t.name}
                    name={t.name}
                    options={{
                        title: t.title,
                        tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? t.iconFilled : t.icon} size={22} color={color as string} />,
                    }}
                />
            ))}
        </Tabs>
    );
}
