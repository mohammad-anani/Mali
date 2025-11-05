import { BUSINESS_FN } from '@/src/dicts/businessFn';
import { QUERY_KEYS } from '@/src/dicts/queryKeys';
import useBalance from "@/src/hooks/useBalance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function useTransactionDetails(isDeposit: boolean) {
  const param = useLocalSearchParams<{ id: string }>();
  const id = +param.id;


  const itemFn = BUSINESS_FN.transactions.item.byId(isDeposit);
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.transactions.item.byId(isDeposit, id), queryFn: async () => {

      return await itemFn(id as number);

    }
  });




  const { lbpBalance, usdBalance } = useBalance();

  const [isOpen, setIsOpen] = useState(false);
  const balance = data?.isLBP ? lbpBalance : usdBalance

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {

      if (isDeposit && balance && data?.amount && ((balance - data.amount) < 0)) {
        setIsOpen(false);
        throw new Error("Balance cannot be negative.")
      }

      const deleteFn = BUSINESS_FN.transactions.delete.of(isDeposit);
      return await deleteFn(id as number);
    },
    onSuccess: async (result) => {
      router.back();

      Toast.show({
        type: "success",
        text1: "Success!",
        text2: `Deletion done successfully`,
      });

      // Refresh balances
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: data?.isLBP ? QUERY_KEYS.balances.lbp : QUERY_KEYS.balances.usd }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions.of(isDeposit).list })
      ]);


    },
    onError: ({ message }) => {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: message ?? `Deletion failed. Please try again later.`,
      });
    },
  });

  const deleteFn = () => mutation.mutate();

  return { isLoading, isError, transaction: data, isOpen, setIsOpen, deleteFn }

}