import toastConfig from '@/src/components/util/config/toastConfig';
import useKeyboardHeight from '@/src/hooks/useKeyboardHeight';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import "../global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function Layout() {

  useEffect(
    () => {
      NavigationBar.setButtonStyleAsync("light");
    }
    , [])

  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
  const paddingBottom = insets.bottom && keyboardHeight ? keyboardHeight : 0

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" translucent={true} />
      <SafeAreaView className='flex-1 bg-background' style={{ paddingBottom: paddingBottom }}>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#3E3E3E" } }} />
      </SafeAreaView>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  )
}

