import { Transaction } from '@/backend/business-layer/transactions/Transaction';
import { ROUTES } from '@/src/dicts/routes';
import { numberToMoney } from '@/src/util/numberToMoney';
import themeColor from '@/src/util/themeColor';
import { ExternalPathString, router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function TransactionRow({ transaction, isDeposit = false }: { transaction: Transaction; isDeposit?: boolean }) {

  const { id, amount, isLBP, title } = transaction;
  const color = themeColor(isDeposit, "bg-", "Light");


  return (
    <Pressable onPress={() => { router.push(ROUTES.actions.of.item(isDeposit, id) as ExternalPathString); }} className={`w-full rounded-full h-14 ${color} flex-row justify-between px-4 items-center`} >
      <Text className='text-[16px]'>{title}</Text>
      <View className='flex-row'>
        <Text className='text-[16px]'>{numberToMoney(amount) + " " + (isLBP ? "LBP" : "USD")}</Text>
      </View>
    </Pressable>
  )
}

