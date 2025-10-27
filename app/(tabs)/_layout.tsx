import { CheckDatabaseExists } from '@/backend/business-layer/general';
import { background, secondary } from '@/src/css';
import { Tabs, router } from 'expo-router';
import { ArrowUpDown, CircleDollarSign, House, Save } from 'lucide-react-native';
import React, { useEffect } from 'react';

export default function Layout() {

  // ✅ Check if database exists once on mount
  useEffect(() => {
    (async () => {
      const dbExists = await CheckDatabaseExists();
      if (!dbExists) router.replace('/setup');
    })();
  }, []);

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{

        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: { hide: { animation: "timing", config: { duration: 0, delay: 0, easing: () => 0 } }, show: { animation: "timing", config: { duration: 0, delay: 0, easing: () => 0 } } }, // 👈 prevents tab bar from moving up
        tabBarActiveTintColor: secondary,
        tabBarInactiveTintColor: '#f7f4eb52',
        tabBarStyle: {
          backgroundColor: '#324335',
          height: 70,
          alignItems: 'center',
        },
        tabBarLabelStyle: { fontSize: 20 },
        tabBarIconStyle: { width: 30, height: 30 },
        sceneStyle: { backgroundColor: background },
        animation: 'shift',
        transitionSpec: { animation: "timing", config: { delay: 0, duration: 100 } },
        lazy: false

      }}

    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="actions"
        options={{

          title: 'Actions',
          tabBarIcon: ({ color, size }) => <ArrowUpDown color={color} size={size} />,
          href: '/actions/deposits/list',

        }}
      />
      <Tabs.Screen
        name="presets"
        options={{
          title: 'Presets',
          tabBarIcon: ({ color, size }) => <Save color={color} size={size} />,
          href: '/presets/deposits/list',
        }}
      />
      <Tabs.Screen
        name="balance"
        options={{
          title: 'Balance',
          tabBarIcon: ({ color, size }) => <CircleDollarSign color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
