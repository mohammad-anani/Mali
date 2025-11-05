import { ROUTES } from '@/src/dicts/routes';
import formatDate from '@/src/util/formatDate';
import { numberToMoney } from '@/src/util/numberToMoney';
import { ExternalPathString, router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import BackArrow from '../util/buttons/BackArrow';
import Button from '../util/buttons/Button';
import Error from '../util/state/Error';
import Loading from '../util/state/Loading';
import Label from '../util/ui/Label';
import Title from '../util/ui/Title';
import DeleteModal from './transactionDetails/DeleteModal';
import useTransactionDetails from './transactionDetails/useTransactionDetails';

export default function TransactionDetails({ isDeposit }: { isDeposit: boolean }) {


  const { isLoading, isError, transaction: data, isOpen, setIsOpen, deleteFn } = useTransactionDetails(isDeposit);

  if (isLoading) {
    return <>
      <BackArrow size={60} color='black' />
      <Loading size='medium' />
    </>
  }

  if (isError || !data) {
    return <>
      <BackArrow size={60} color='black' />
      <Error message={`${isDeposit ? "Deposit" : "Withdraw"} retreiving failed. Please try again later`} />
    </>
  }


  const { isLBP, amount, title, date, presetID } = data


  return (
    <>
      <BackArrow size={60} color='black' />


      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1">
        <View className='gap-3 justify-between  flex-1 '>
          <View className='gap-3 flex-1'>

            <Title >{isDeposit ? "Deposit" : "Withdraw"} Details:</Title>

            <View className='gap-3'>
              <View>

                <Label>Title:</Label>
                <Text className='text-xl'>{title}</Text>
              </View>
              <View>

                <Label>Amount:</Label>
                <Text className='text-xl'>{numberToMoney(amount)} {isLBP ? "LBP" : "USD"}</Text>
              </View>
              <View>

                <Label>Date:</Label>
                <Text className='text-xl'>{formatDate(date)}</Text>
              </View>
            </View>
          </View>
          <View className='gap-2'>

            {presetID ? <Button pressableProps={{ className: "w-full justify-center items-center bg-edit rounded-3xl h-20", onPress: () => { router.push(ROUTES.presets.of.item(isDeposit, presetID) as ExternalPathString) } }} textProps={{ className: "text-4xl text-secondary" }}>View Preset</Button> : null}
            <Button pressableProps={{ className: "w-full justify-center items-center bg-destroy rounded-3xl h-20", onPress: () => { setIsOpen(true) } }} textProps={{ className: "text-4xl text-secondary" }}>Delete</Button>
          </View>
        </View>

      </ScrollView>
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} deleteFn={deleteFn} />
    </>
  )
}