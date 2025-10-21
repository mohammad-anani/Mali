import { AddDeposit, AddDepositSchema } from "@/backend/business-layer/transactions/Deposit";
import { AddWithdraw, AddWithdrawSchema } from "@/backend/business-layer/transactions/Withdraw";
import { createDeposit } from "@/backend/data-access-layer/transactions/deposits";
import { createWithdraw } from "@/backend/data-access-layer/transactions/withdraws";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export type QuickTransactionForm = {
  title: string;
  amount: number | null;
  isLBP: boolean;
};

export default function useQuickTransaction(
  mode: "Deposit" | "Withdraw",

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
  const isDeposit = mode === "Deposit";


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

    const action = isDeposit ? createDeposit : createWithdraw;
    const id = await action(data);

    if (!id) {
      throw new Error(`${mode} failed`);
    }

    // Return useful info to onSuccess()
    return { id, isLBP: object.isLBP };
  }


  const mutation = useMutation({
    mutationFn: submitFn,
    onSuccess: (result) => {
      // Reset form
      setObject({ title: "", amount: null, isLBP: true });
      setHasSubmitted(false);

      Toast.show({
        type: "success",
        text1: "Success!",
        text2: `${mode} done successfully`,
      });

      // Refresh balances
      queryClient.invalidateQueries({
        queryKey: [result.isLBP ? "lbpBalance" : "usdBalance"],
      });

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
    isDeposit,
    object,
    setObject,
    hasSubmitted,
    isSubmitError,
    submit,
    isLoading: mutation.isPending,
  };
}
