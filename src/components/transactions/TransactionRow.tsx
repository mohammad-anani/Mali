import { Transaction } from '@/backend/business-layer/transactions/Transaction';
import { numberToMoney } from '@/src/util/numberToMoney';
import { ExternalPathString, router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function TransactionRow({ transaction, isDeposit = false }: { transaction: Transaction; isDeposit?: boolean }) {

  const { id, amount, isLBP, title } = transaction;

  return (
    <Pressable onPress={() => { router.push((isDeposit ? `/actions/deposits/${id}` : `/actions/withdraws/${id}`) as ExternalPathString); }} className={`w-full rounded-full h-14 ${isDeposit ? "bg-primaryLight" : "bg-destroyLight"} flex-row justify-between px-4 items-center`} >
      <Text className='text-[16px]'>{title}</Text>
      <View className='flex-row'>
        <Text className='text-[16px]'>{numberToMoney(amount) + " " + (isLBP ? "LBP" : "USD")}</Text>
      </View>
    </Pressable>
  )
}

