import { deleteDeposit, findDepositByID } from '@/backend/business-layer/transactions/Deposit';
import { deleteWithdraw, findWithdrawByID } from '@/backend/business-layer/transactions/Withdraw';
import formatDate from '@/src/util/formatDate';
import { numberToMoney } from '@/src/util/numberToMoney';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import BackArrow from '../util/BackArrow';
import Button from '../util/Button';
import Error from '../util/Error';
import Loading from '../util/Loading';
import Modal from '../util/Modal';
import Title from '../util/Title';

export default function TransactionDetails({ isDeposit }: { isDeposit: boolean }) {

  const param = useLocalSearchParams<{ id: string }>();
  const id = +param.id;


  const { data, isLoading, isError } = useQuery({
    queryKey: [isDeposit ? "getDeposit" : "getWithdraw"], queryFn: async () => {

      return await (isDeposit ? findDepositByID : findWithdrawByID)(id);

    }
  });

  const [isOpen, setIsOpen] = useState(false);


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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='p-6 gap-2'>
        <Text className='text-destroy underline text-[30px] font-bold'>Confirm Delete?</Text>
        <Text className='text-xl'>Deleting this transaction will permanently change the balance. Confirm deletion?</Text>
        <Button pressableProps={{ className: "w-full h-20 border-[1px] border-destroy rounded-xl justify-center items-center", onPress: () => { setIsOpen(false) } }} textProps={{ className: "text-destroy text-3xl " }}>
          Cancel
        </Button>
        <Button pressableProps={{
          className: "w-full h-20 bg-destroy rounded-xl justify-center items-center", onPress: async () => {

            const success = await (isDeposit ? deleteDeposit : deleteWithdraw)(id);


            if (success) {
              router.back();
            }
          }
        }} textProps={{ className: "text-secondary text-3xl " }}>
          Confirm
        </Button>
      </Modal>
    </>
  )
}