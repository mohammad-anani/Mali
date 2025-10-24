import Logo from '@/src/components/util/Logo';
import LogoName from '@/src/components/util/LogoName';
import useKeyboard from '@/src/hooks/useKeyboard';
import React from 'react';
import { View } from 'react-native';

export default function LogoDisplay() {

  const isKeyboardUp = useKeyboard();

  return (
    <View className={!isKeyboardUp ? 'gap-8 flex flex-col items-center' : 'gap-3 flex flex-row items-center'}>

      <Logo className={!isKeyboardUp ? 'h-[186px] w-[186px]' : 'h-[60px] w-[60px]'} />
      <LogoName className={!isKeyboardUp ? 'h-[120px] aspect-[2/1] ' : 'h-[40px] w-[100px] aspect-[2/1] '} />
    </View>
  )
}