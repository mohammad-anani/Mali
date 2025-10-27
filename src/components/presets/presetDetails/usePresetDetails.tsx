import { BUSINESS_FN } from '@/src/dicts/businessFn';
import { QUERY_KEYS } from '@/src/dicts/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export default function usePresetDetails(isDeposit: boolean) {
  const param = useLocalSearchParams<{ id: string }>();
  const id = +param.id;


  const itemFn = BUSINESS_FN.presets.item.byId(isDeposit);
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.presets.item.byId(isDeposit, id), queryFn: async () => {

      return await itemFn(id as number);

    }
  });

  const [isOpen, setIsOpen] = useState(false);

  const deleteFn = async () => {

    const deleteFn = BUSINESS_FN.presets.delete.of(isDeposit);
    const success = await deleteFn(id as number);


    if (success) {

      Toast.show({
        type: "success", text1: "Success", text2: "Preset deleted successfully!"
      })

      router.back();
    }
    else {
      Toast.show({
        type: "error", text1: "Error", text2: "Preset deletion failed.Please try again later"
      })
      setIsOpen(false);
    }
  }



  return { isLoading, isError, preset: data, isOpen, setIsOpen, deleteFn }
}