import { numberToMoney } from '@/src/util/numberToMoney'
import { Label } from '@react-navigation/elements'
import React from 'react'
import { Text, View } from 'react-native'
import { TransactionForm } from './useNewTransaction'

export default function PresetDetails({ object }: { object: TransactionForm }) {
  return (<>
    <View className='gap-[2px]'>
      <Label className='ml-5'>Title:</Label>
      <Text className='text-[22px] px-5 h-[55px]'>{object.title}</Text>
    </View>
    <View className='gap-[2px]'>
      <Label className='ml-5'>Amount:</Label>
      <Text className='text-[22px] px-5 h-[55px]'>{numberToMoney(object.amount ?? "")} {object.isLBP ? "LBP" : "USD"}</Text>
    </View>
  </>
  )
}