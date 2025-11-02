import { Preset } from '@/backend/business-layer/presets/Preset';
import usePresetIdLayout from '@/src/components/presets/usePresetIdLayout';
import BackArrow from '@/src/components/util/buttons/BackArrow';
import Error from '@/src/components/util/state/Error';
import Loading from '@/src/components/util/state/Loading';
import { secondary } from '@/src/css';
import { router, Stack } from 'expo-router';
import React, { createContext, useContext } from 'react';

const WithdrawContext = createContext<Preset | null>(null);

export function useWithdrawPresetDetails() {
  return useContext(WithdrawContext);
}



export default function Layout() {

  const { isKeyboardUp, preset, isError, isLoading } = usePresetIdLayout(false);

  if (isLoading) {
    return <>
      <BackArrow size={60} color='black' onPress={() => { router.back() }} />
      <Loading size='medium' />
    </>
  }

  if (isError || !preset) {
    return <>
      <BackArrow size={60} color='black' onPress={() => { router.back() }} />
      <Error message={`Withdraw retreiving failed. Please try again later`} />
    </>
  }


  return (
    <>
      <BackArrow size={!isKeyboardUp ? 60 : 30} color='black' />
      <WithdrawContext.Provider value={preset}>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: secondary }, animation: "fade" }} />
      </WithdrawContext.Provider>
    </>

  )
}