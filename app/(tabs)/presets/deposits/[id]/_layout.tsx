import { Preset } from '@/backend/business-layer/presets/Preset';
import BackArrow from '@/src/components/util/buttons/BackArrow';
import Error from '@/src/components/util/state/Error';
import Loading from '@/src/components/util/state/Loading';
import { secondary } from '@/src/css';
import BUSINESS_FN from '@/src/dicts/businessFn';
import QUERY_KEYS from '@/src/dicts/queryKeys';
import useKeyboard from '@/src/hooks/useKeyboard';
import { useQuery } from '@tanstack/react-query';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { createContext, useContext } from 'react';

const DepositContext = createContext<Preset | null>(null);

export function useDepositPresetDetails() {
  return useContext(DepositContext);
}



export default function Layout() {

  const isKeyboardUp = useKeyboard();

  const param = useLocalSearchParams<{ id: string }>();
  const id = +param.id;
  const itemFn = BUSINESS_FN.presets.item.byId(true);
  const { data: preset, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.presets.item.byId(true, id), queryFn: async () => {

      return await itemFn(id as number);

    }
  });


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