import { deleteWithdraw } from "@/backend/business-layer/transactions/Withdraw";
import { deleteDeposit, findDepositByID } from "@/backend/data-access-layer/transactions/deposits";
import { findWithdrawByID } from "@/backend/data-access-layer/transactions/withdraws";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function useTransactionDetails(isDeposit: boolean) {
  const param = useLocalSearchParams<{ id: string }>();
  const id = +param.id;


  const { data, isLoading, isError } = useQuery({
    queryKey: [isDeposit ? "getDeposit" : "getWithdraw", id], queryFn: async () => {

      return await (isDeposit ? findDepositByID : findWithdrawByID)(id);

    }
  });

  const [isOpen, setIsOpen] = useState(false);


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => { return await isDeposit ? deleteDeposit(id) : deleteWithdraw(id); },
    onSuccess: async (result) => {
      router.back();

      Toast.show({
        type: "success",
        text1: "Success!",
        text2: `Deletion done successfully`,
      });

      // Refresh balances
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [data.isLBP ? "lbpBalance" : "usdBalance"] }),
        queryClient.invalidateQueries({ queryKey: [isDeposit ? "getDeposits" : "getWithdraws"] })
      ]);


    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: `Deletion failed. Please try again later.`,
      });
    },
  });

  const deleteFn = () => mutation.mutate();

  return { isLoading, isError, transaction: data, isOpen, setIsOpen, deleteFn }

}