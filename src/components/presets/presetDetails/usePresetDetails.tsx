import { deleteDepositPreset, findDepositPreset } from '@/backend/business-layer/presets/deposits';
import { deleteWithdrawPreset, findWithdrawPreset } from '@/backend/business-layer/presets/withdraws';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export default function usePresetDetails(isDeposit: boolean) {
  const param = useLocalSearchParams<{ id: string }>();
  const id = +param.id;


  const { data, isLoading, isError } = useQuery({
    queryKey: [isDeposit ? "getDeposit" : "getWithdraw"], queryFn: async () => {

      return await (isDeposit ? findDepositPreset : findWithdrawPreset)(id);

    }
  });

  const [isOpen, setIsOpen] = useState(false);

  const deleteFn = async () => {

    const success = await (isDeposit ? deleteDepositPreset : deleteWithdrawPreset)(id);


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