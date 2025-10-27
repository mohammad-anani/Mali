import { numberToMoney } from '@/src/util/numberToMoney';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import BackArrow from '../util/buttons/BackArrow';
import Button from '../util/buttons/Button';
import Error from '../util/state/Error';
import Loading from '../util/state/Loading';
import Title from '../util/ui/Title';
import DeleteModal from './presetDetails/DeleteModal';
import usePresetDetails from './presetDetails/usePresetDetails';

export default function PresetDetails({ isDeposit }: { isDeposit: boolean }) {


  const { isLoading, isError, preset, isOpen, setIsOpen, deleteFn } = usePresetDetails(isDeposit);

  if (isLoading) {
    return <>
      <BackArrow size={60} color='black' />
      <Loading size='medium' />
    </>
  }

  if (isError || !preset) {
    return <>
      <BackArrow size={60} color='black' />
      <Error message={`${isDeposit ? "Deposit" : "Withdraw"} retreiving failed. Please try again later`} />
    </>
  }


  const { isLBP, amount, title } = preset;


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

            </View>
          </View>

          <Button pressableProps={{ className: "w-full justify-center items-center bg-destroy rounded-3xl h-20", onPress: () => { setIsOpen(true) } }} textProps={{ className: "text-4xl text-secondary" }}>Delete</Button>
        </View>
      </ScrollView>
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} deleteFn={deleteFn} />
    </>
  )
}