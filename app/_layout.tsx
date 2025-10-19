import toastConfig from '@/src/components/util/toastConfig';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';


export default function Layout() {




  useEffect(
    () => {
      NavigationBar.setButtonStyleAsync("light");       // set icon color
    }
    , [])

  return (
    <>


      <StatusBar barStyle="light-content" translucent={true} />
      <SafeAreaView className='bg-background flex-1  '>

        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#3E3E3E" } }}  >

        </Stack>
      </SafeAreaView>
      <Toast config={toastConfig} />

    </>
  )
}

