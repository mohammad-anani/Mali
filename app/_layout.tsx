import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {


  useEffect(
    () => {
      NavigationBar.setButtonStyleAsync("light");       // set icon color
    }
    , [])

  return (
    <>
      <StatusBar barStyle="light-content" translucent={true} />
      <SafeAreaView className='bg-background flex-1 pb-10 pt-2 px-5 '>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#3E3E3E" } }} initialRouteName='setup'>
        </Stack>
      </SafeAreaView>
    </>
  )
}

