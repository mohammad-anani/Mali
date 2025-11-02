import { Preset } from '@/backend/business-layer/presets/Preset';
import usePresetIdLayout from '@/src/components/presets/usePresetIdLayout';
import BackArrow from '@/src/components/util/buttons/BackArrow';
import Error from '@/src/components/util/state/Error';
import Loading from '@/src/components/util/state/Loading';
import { secondary } from '@/src/css';
import { router, Stack } from 'expo-router';
import React, { createContext, useContext } from 'react';

const DepositContext = createContext<Preset | null>(null);

export function useDepositPresetDetails() {
  return useContext(DepositContext);
}



export default function Layout() {

  const { isKeyboardUp, preset, isError, isLoading } = usePresetIdLayout(true);


  if (isLoading) {
    return <>
      <BackArrow size={60} color='black' onPress={() => { router.back() }} />

      <Loading size='medium' />
    </>
  }

  if (isError || !preset) {
    return <>
      <BackArrow size={60} color='black' onPress={() => { router.back() }} />

      <Error message={`Deposit retreiving failed. Please try again later`} />
    </>
  }


  return (
    <>
      <BackArrow size={!isKeyboardUp ? 60 : 30} color='black' />

      <DepositContext.Provider value={preset}>

        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: secondary }, animation: "fade" }} />
      </DepositContext.Provider>
    </>

  )
}