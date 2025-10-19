import { background, secondary } from '@/src/css'
import { Tabs } from 'expo-router'
import { ArrowUpDown, CircleDollarSign, House, Save } from 'lucide-react-native'
import React from 'react'

export default function Layout() {



  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: secondary,
        tabBarInactiveTintColor: '#f7f4eb52',
        tabBarStyle: { backgroundColor: '#324335', height: 70, alignItems: "center" },
        tabBarLabelStyle: { fontSize: 20 },
        tabBarIconStyle: { width: 30, height: 30, },
        sceneStyle: { backgroundColor: background }
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
        }}
      />
      <Tabs.Screen
        name="presets"
        options={{
          title: 'Presets',
          tabBarIcon: ({ color, size }) => <Save color={color} size={size} />,
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
  )
}

