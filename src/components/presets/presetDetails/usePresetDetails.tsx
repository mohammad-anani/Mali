import { BUSINESS_FN } from '@/src/dicts/businessFn';
import { QUERY_KEYS } from '@/src/dicts/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export default function usePresetDetails(isDeposit: boolean, id: number) {



  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const deleteFn = async () => {

    const deleteFn = BUSINESS_FN.presets.delete.of(isDeposit);
    const success = await deleteFn(id as number);


    if (success) {

      Toast.show({
        type: "success", text1: "Success", text2: "Preset deleted successfully!"
      })
      Promise.all(
        [

          await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.presets.of(isDeposit).list })
          , await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions.of(isDeposit).list }),
          , await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions.of(isDeposit).itemNoID() })

        ]
      )


      router.back();
    }
    else {
      Toast.show({
        type: "error", text1: "Error", text2: "Preset deletion failed.Please try again later"
      })
      setIsOpen(false);
    }
  }



  return { isOpen, setIsOpen, deleteFn }
}