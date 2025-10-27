import { AddDeposit, AddDepositSchema } from "@/backend/business-layer/transactions/Deposit";
import { AddWithdraw, AddWithdrawSchema } from "@/backend/business-layer/transactions/Withdraw";
import { BUSINESS_FN } from '@/src/dicts/businessFn';
import { QUERY_KEYS } from '@/src/dicts/queryKeys';
import getMode from "@/src/util/getMode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export type QuickTransactionForm = {
  title: string;
  amount: number | null;
  isLBP: boolean;
};

export default function useQuickTransaction(
  isDeposit: boolean

) {

  //submit click
  const [hasSubmitted, setHasSubmitted] = useState(false);

  //submit error
  const [isSubmitError, setIsSubmitError] = useState(false);

  //init object
  const [object, setObject] = useState<QuickTransactionForm>({
    title: "",
    amount: null,
    isLBP: true,
  });


  const queryClient = useQueryClient();
  const mode = getMode(isDeposit);


  //disable button for 5s if submitError is true
  useEffect(() => {
    if (!isSubmitError) return;

    const timeout = setTimeout(() => { setHasSubmitted(false); setIsSubmitError(false); }, 5000);
    return () => clearTimeout(timeout);
  }, [isSubmitError]);


  //action on submit
  async function submitFn() {
    setHasSubmitted(true);

    const data = { ...object, presetID: null } as AddDeposit | AddWithdraw;
    const schema = isDeposit ? AddDepositSchema : AddWithdrawSchema;

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      console.log(parsed.error.format());
      setIsSubmitError(true);
      throw new Error("Validation failed");
    }

    const action = BUSINESS_FN.transactions.create.of(isDeposit);
    const id = await action(data as any);

    if (!id) {
      throw new Error(`${mode} failed`);
    }

    // Return useful info to onSuccess()
    return { id, isLBP: object.isLBP };
  }


  const mutation = useMutation({
    mutationFn: submitFn,
    onSuccess: async (result) => {
      // Reset form
      setObject({ title: "", amount: null, isLBP: true });
      setHasSubmitted(false);

      Toast.show({
        type: "success",
        text1: "Success!",
        text2: `${mode} done successfully`,
      });

      // Refresh balances
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: result.isLBP ? QUERY_KEYS.balances.lbp : QUERY_KEYS.balances.usd }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions.of(isDeposit).list }),
      ]);


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

  return {
    mode,
    object,
    setObject,
    hasSubmitted,
    isSubmitError,
    submit,
    isLoading: mutation.isPending,
  };
}
