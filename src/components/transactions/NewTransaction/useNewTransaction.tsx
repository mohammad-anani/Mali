
import { AddTransaction, AddTransactionSchema } from '@/backend/business-layer/transactions/Transaction';
import { BUSINESS_FN } from '@/src/dicts/businessFn';
import { QUERY_KEYS } from '@/src/dicts/queryKeys';
import getMode from '@/src/util/getMode';
import { numberToMoney } from '@/src/util/numberToMoney';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';


export type TransactionForm = {
  title: string;
  amount: number | null;
  isLBP: boolean;
  presetID: number | null;
};


export default function useNewTransaction(isDeposit: boolean, balances: [number | null, number | null]) {

  const [object, setObject] = useState<TransactionForm>({ title: "", amount: null, isLBP: true, presetID: null });
  const { data: presets } = useQuery({ queryKey: QUERY_KEYS.presets.of(isDeposit).list, queryFn: BUSINESS_FN.presets.list.of(isDeposit) });


  let presetsList = presets ? presets.map(p => ({ label: (p.title + " " + numberToMoney(p.amount) + " ") + (p.isLBP ? "LBP" : "USD"), value: p.id })) : [];

  presetsList = [{ label: "None", value: 0 }, ...presetsList]
  console.log(presetsList);

  useEffect(() => {

    if (!object.presetID) {
      setObject((o) => ({ ...o, isLBP: true, title: "", amount: null }))

    }
    else {


      const preset = presets?.find(p => p.id === object.presetID);

      if (!preset) {
        setObject((o) => ({ ...o, isLBP: true, title: "", amount: null }))
      }
      else {


        setObject((o) => ({ ...o, isLBP: preset?.isLBP, title: preset?.title, amount: preset?.amount }))
      }
    }

  }, [object.presetID])

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

    const data = object as AddTransaction;
    const schema = AddTransactionSchema

    const balance = balances?.[object.isLBP ? 0 : 1];


    const withdrawExceedsBalance = balance !== -1 && object.amount && !isDeposit && balance && object.amount > balance;

    if (withdrawExceedsBalance) {
      setIsSubmitError(true);
      console.log("Hello");
      throw new Error("Validation failed");

    }



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

    const action = BUSINESS_FN.transactions.create.of(isDeposit);
    const id = await action(data);

    if (!id) {
      throw new Error(`${mode} failed`);
    }

    setObject({ isLBP: true, title: "", amount: null, presetID: null })
    router.back();
    // Return useful info to onSuccess()
    return { id, isLBP: object.isLBP };
  }

  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: submitFn,
    onSuccess: async (result) => {
      // Reset form
      setObject({ title: "", amount: null, isLBP: true, presetID: null });
      setHasSubmitted(false);

      Toast.show({
        type: "success",
        text1: "Success!",
        text2: `${mode} added successfully`,
      });


      Promise.all(
        [
          await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions.of(isDeposit).list }),
          await queryClient.invalidateQueries({ queryKey: (result.isLBP ? QUERY_KEYS.balances.lbp : QUERY_KEYS.balances.usd) })


        ]
      )

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

  return { isLoading: mutation.isPending, isSubmitError, object, setObject, hasSubmitted, submit, presetsList };

}