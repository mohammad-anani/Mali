import { Transaction } from '@/backend/business-layer/transactions/Transaction';
import { numberToMoney } from '@/src/util/numberToMoney';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function TransactionRow({ transaction, isWithdraw }: { transaction: Transaction; isWithdraw: boolean }) {


  return (
    <Pressable className={`w-full rounded-full h-14 ${isWithdraw ? "bg-destroyLight" : "bg-primaryLight"} flex-row justify-between px-4 items-center`} >
      <Text className='text-[16px]'>{transaction.title}</Text>
      <View className='flex-row'>
        <Text className='text-[16px]'>{numberToMoney(transaction.amount) + " " + (transaction.isLBP ? "LBP" : "USD")}</Text>
      </View>
    </Pressable>
  )
}

