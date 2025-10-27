import toastConfig from '@/src/components/util/config/toastConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import "../global.css";


export default function Layout() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,          // queries never become stale
        refetchOnMount: false,        // don't refetch on mount
        refetchOnWindowFocus: false,  // don't refetch when window/tab gains focus
        refetchOnReconnect: false,    // don't refetch on reconnect
      },
    },
  });

  useEffect(
    () => {
      NavigationBar.setButtonStyleAsync("light"); //bottom bar buttons color
    }
    , [])



  return (
    <>

      <QueryClientProvider client={queryClient}>

        <StatusBar barStyle="light-content" translucent={true} />


        <SafeAreaView className='flex-1 bg-background'>

          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#3E3E3E" } }} />
        </SafeAreaView>



        <Toast config={toastConfig} />

      </QueryClientProvider>
    </>
  )
}

