import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {

  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#3E3E3E" }, animation: "fade", }} initialRouteName='deposits' />

}
