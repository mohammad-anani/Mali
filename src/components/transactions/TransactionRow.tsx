import { Transaction } from '@/backend/business-layer/transactions/Transaction';
import { numberToMoney } from '@/src/util/numberToMoney';
import { ExternalPathString, router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function TransactionRow({ transaction, isWithdraw }: { transaction: Transaction; isWithdraw: boolean }) {

  const { id, amount, isLBP, title } = transaction;

  return (
    <Pressable onPress={() => { router.push((isWithdraw ? `/actions/withdraws/${id}` : `/actions/deposits/${id}`) as ExternalPathString); }} className={`w-full rounded-full h-14 ${isWithdraw ? "bg-destroyLight" : "bg-primaryLight"} flex-row justify-between px-4 items-center`} >
      <Text className='text-[16px]'>{title}</Text>
      <View className='flex-row'>
        <Text className='text-[16px]'>{numberToMoney(amount) + " " + (isLBP ? "LBP" : "USD")}</Text>
      </View>
    </Pressable>
  )
}

