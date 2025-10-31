import { Preset } from '@/backend/business-layer/presets/Preset';
import { ROUTES } from '@/src/dicts/routes';
import { numberToMoney } from '@/src/util/numberToMoney';
import themeColor from '@/src/util/themeColor';
import { ExternalPathString, router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function PresetRow({ preset, isDeposit = false }: { preset: Preset; isDeposit?: boolean }) {

  const { id, amount, isLBP, title } = preset;
  const color = themeColor(isDeposit, "bg-", "Light");

  const onPress = () => { router.push(ROUTES.presets.of.item(isDeposit, id) as ExternalPathString); }
  const amountFormat = numberToMoney(amount) + " " + (isLBP ? "LBP" : "USD")
  return (
    <Pressable onPress={onPress} className={`w-full rounded-full h-14 ${color} flex-row justify-between px-4 items-center`} >
      <Text className='text-[16px]'>{title}</Text>
      <View className='flex-row'>
        <Text className='text-[16px]'>{amountFormat}</Text>
      </View>
    </Pressable>
  )
}

