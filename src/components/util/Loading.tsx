import { primary } from '@/src/css'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Logo from './Logo'
import LogoName from './LogoName'

export default function Loading() {
  return (<View className="flex flex-col pt-[40%] items-center  h-full gap-10">
    <View className='gap-8 flex flex-col items-center'>

      <Logo className='h-[100px] w-[100px]' />
      <LogoName className='h-[80px] aspect-[2/1] ' />
    </View>
    <ActivityIndicator size={100} color={primary} />
  </View>)
}