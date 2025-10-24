import { CheckDatabaseExists } from '@/backend/business-layer/general'
import { background, secondary } from '@/src/css'
import { router, Tabs } from 'expo-router'
import { ArrowUpDown, CircleDollarSign, House, Save } from 'lucide-react-native'
import React, { useEffect } from 'react'

export default function Layout() {


  useEffect(
    () => {
      async function checkDB() {

        const dbExists = await CheckDatabaseExists();

        if (!dbExists)
          router.replace("/setup");


      }

      checkDB();

    }
    , [])

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        popToTopOnBlur: true,
        tabBarActiveTintColor: secondary,
        tabBarInactiveTintColor: '#f7f4eb52',
        tabBarStyle: { backgroundColor: '#324335', height: 70, alignItems: "center" },
        tabBarLabelStyle: { fontSize: 20 },
        tabBarIconStyle: { width: 30, height: 30, },
        sceneStyle: { backgroundColor: background },
        animation: "shift",



      }}

      initialRouteName='home'
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

