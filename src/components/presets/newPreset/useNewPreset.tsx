import { AddDepositPreset, AddDepositPresetSchema } from '@/backend/business-layer/presets/deposits';
import { AddWithdrawPreset, AddWithdrawPresetSchema } from '@/backend/business-layer/presets/withdraws';
import { BUSINESS_FN } from '@/src/dicts/businessFn';
import { QUERY_KEYS } from '@/src/dicts/queryKeys';
import getMode from '@/src/util/getMode';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';


export type PresetForm = {
  title: string;
  amount: number | null;
  isLBP: boolean;
};


export default function useNewPreset(isDeposit: boolean) {

  const [object, setObject] = useState<PresetForm>({ title: "", amount: null, isLBP: true });


  //submit click
  const [hasSubmitted, setHasSubmitted] = useState(false);

  //submit error
  const [isSubmitError, setIsSubmitError] = useState(false);

  //disable button for 5s if submitError is true
  useEffect(() => {
    if (!isSubmitError) return;

    const timeout = setTimeout(() => { setHasSubmitted(false); setIsSubmitError(false); }, 5000);
    return () => clearTimeout(timeout);
  }, [isSubmitError]);

  const mode = getMode(isDeposit);


  //action on submit
  async function submitFn() {
    setHasSubmitted(true);

    const data = object as AddDepositPreset | AddWithdrawPreset;
    const schema = isDeposit ? AddDepositPresetSchema : AddWithdrawPresetSchema;

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      console.log(parsed.error.format());
      setIsSubmitError(true);
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Validation failed!",
      });
      throw new Error(`${mode} failed`);
    }

    const action = BUSINESS_FN.presets.create.of(isDeposit);
    const id = await action(data as any);

    if (!id) {
      throw new Error(`${mode} failed`);
    }

    setObject({ isLBP: true, title: "", amount: null })
    router.back();
    // Return useful info to onSuccess()
    return { id, isLBP: object.isLBP };
  }

  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: submitFn,
    onSuccess: async (result) => {
      // Reset form
      setObject({ title: "", amount: null, isLBP: true });
      setHasSubmitted(false);

      Toast.show({
        type: "success",
        text1: "Success!",
        text2: `${mode} Preset added successfully`,
      });


      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.presets.of(isDeposit).list })

    },
    onError: (err: any) => {
      Toast.show({

        type: "error",
        text1: "Error!",
        text2: err.message || `${mode} failed. Please try again later.`,
      });
    },
  });


  const submit = () => mutation.mutate();

  return { isLoading: mutation.isPending, isSubmitError, object, setObject, hasSubmitted, submit };

}