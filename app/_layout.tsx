import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function _layout() {
  return (
    <>
      <StatusBar barStyle="light-content" translucent={true} />
      <SafeAreaView className='bg-background flex-1 p-3'>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#3E3E3E" } }} initialRouteName='setup'>
        </Stack>
      </SafeAreaView>
    </>
  )
}

