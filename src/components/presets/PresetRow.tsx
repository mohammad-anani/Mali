import { Preset } from '@/backend/business-layer/presets/transactions';
import { numberToMoney } from '@/src/util/numberToMoney';
import { ExternalPathString, router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function PresetRow({ preset, isWithdraw }: { preset: Preset; isWithdraw: boolean }) {

  const { id, amount, isLBP, title } = preset;

  const onPress = () => { router.push((isWithdraw ? `/actions/withdraws/${id}` : `/actions/deposits/${id}`) as ExternalPathString); }
  const amountFormat = numberToMoney(amount) + " " + (isLBP ? "LBP" : "USD")
  return (
    <Pressable onPress={onPress} className={`w-full rounded-full h-14 ${isWithdraw ? "bg-destroyLight" : "bg-primaryLight"} flex-row justify-between px-4 items-center`} >
      <Text className='text-[16px]'>{title}</Text>
      <View className='flex-row'>
        <Text className='text-[16px]'>{amountFormat}</Text>
      </View>
    </Pressable>
  )
}

