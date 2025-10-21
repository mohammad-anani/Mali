import React from 'react';
import { Pressable, Text, View } from 'react-native';




export default function CurrencyToggle({ isToggled, setIsToggled, isDeposit }: { isToggled: boolean, setIsToggled: (isToggled: boolean) => void, isDeposit: boolean }) {
  const baseViewClass = 'w-[75px] rounded-full h-[90%]';
  const activeViewClass = isDeposit ? 'bg-primary' : "bg-destroy";
  const baseTextClass = 'text-[22px] text-center mt-2';
  const activeTextClass = 'text-secondary';

  return (
    <View className='flex-row bg-white rounded-full w-[155px] justify-center items-center'>
      <Pressable
        onPress={() => setIsToggled(false)}
        className={baseViewClass + (!isToggled ? ` ${activeViewClass}` : '')}
      >
        <Text className={baseTextClass + (!isToggled ? ` ${activeTextClass}` : '')}>LBP</Text>
      </Pressable>
      <Pressable
        onPress={() => setIsToggled(true)}
        className={baseViewClass + (isToggled ? ` ${activeViewClass}` : '')}
      >
        <Text className={baseTextClass + (isToggled ? ` ${activeTextClass}` : '')}>USD</Text>
      </Pressable>
    </View>
  );
}

