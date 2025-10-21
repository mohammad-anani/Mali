import Logo from '@/src/components/util/Logo'
import LogoName from '@/src/components/util/LogoName'
import React from 'react'
import { View } from 'react-native'

export default function Header() {

  return (<View className='gap-3 flex flex-row items-center'>

    <Logo className='h-[60px] w-[60px]' />
    <LogoName className='h-[40px] w-[100px] aspect-[2/1] ' />
  </View>

  )
}

