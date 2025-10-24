import { deleteWithdraw } from '@/backend/business-layer/presets/withdraws';
import { deleteDeposit, findDepositByID } from '@/backend/business-layer/transactions/Deposit';
import { findWithdrawByID } from '@/backend/business-layer/transactions/Withdraw';
import formatDate from '@/src/util/formatDate';
import { numberToMoney } from '@/src/util/numberToMoney';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import BackArrow from '../util/BackArrow';
import Button from '../util/Button';
import Error from '../util/Error';
import Loading from '../util/Loading';
import Title from '../util/Title';
import DeleteModal from './transactionDetails/DeleteModal';

export default function TransactionDetails({ isDeposit }: { isDeposit: boolean }) {

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
        queryClient.invalidateQueries({ queryKey: [isLBP ? "lbpBalance" : "usdBalance"] }),
        queryClient.invalidateQueries({ queryKey: [isDeposit ? "getDeposits" : "getWithdraws"] })
      ]);


    },
    onError: (err: any) => {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: err.message || `Deletion failed. Please try again later.`,
      });
    },
  });

  const deleteFn = () => mutation.mutate();


  if (isLoading) {
    return <>
      <BackArrow size={60} color='black' onPress={() => { router.back() }} />
      <Loading size='medium' />
    </>
  }

  if (isError || !data) {
    return <>
      <BackArrow size={60} color='black' onPress={() => { router.back() }} />
      <Error message={`${isDeposit ? "Deposit" : "Withdraw"} retreiving failed. Please try again later`} />
    </>
  }

  const { isLBP, amount, title, date } = data



  return (
    <>
      <BackArrow size={60} color='black' onPress={() => { router.back() }} />


      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1">
        <View className='gap-3 justify-between  flex-1 '>
          <View className='gap-3 flex-1'>

            <Title >{isDeposit ? "Deposit" : "Withdraw"} Details:</Title>

            <View className='gap-3'>
              <View>

                <Text className='underline text-2xl'>Title:</Text>
                <Text className='text-xl'>{title}</Text>
              </View>
              <View>

                <Text className='underline text-2xl'>Amount:</Text>
                <Text className='text-xl'>{numberToMoney(amount)} {isLBP ? "LBP" : "USD"}</Text>
              </View>
              <View>

                <Text className='underline text-2xl'>Date:</Text>
                <Text className='text-xl'>{formatDate(date)}</Text>
              </View>
            </View>
          </View>

          <Button pressableProps={{ className: "w-full justify-center items-center bg-destroy rounded-3xl h-20", onPress: () => { setIsOpen(true) } }} textProps={{ className: "text-4xl text-secondary" }}>Delete</Button>
        </View>

      </ScrollView>
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} isDeposit={isDeposit} deleteFn={deleteFn} />
    </>
  )
}