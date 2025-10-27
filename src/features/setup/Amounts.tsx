import { initObject } from '@/src/features/setup/useSetup';
import { Setter } from '@/src/types';
import { minimum_1k_MoneyFormatter } from '@/src/util/minimum_1k_MoneyFormatter';
import { numberToMoney } from '@/src/util/numberToMoney';
import React from 'react';
import { Text, View } from 'react-native';
import Input from '../../components/util/inputs/Input';
import { MIN_AMOUNT } from '../../util/constants';

export default function Amounts({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {

  const amountError = object.lbp && object.lbp % MIN_AMOUNT !== 0;

  const handleLBPChangeText = (text: string) => {
    setObject(obj => ({ ...obj, lbp: +text }))
  }
  const handleUSDChangeText = (text: string) => setObject(obj => ({ ...obj, usd: +text }))


  return <View className='gap-3'>
    <Text className='text-[35px] text-secondary ml-5 '>Enter your balances:</Text>
    <View className='gap-3 '>
      <View className='flex flex-row gap-3'>

        <Input keyboardType="numeric" placeholder='25,000,000' className='w-[75%]' value={object.lbp ? object.lbp.toString() : undefined} onChangeText={handleLBPChangeText} />
        <Text className='text-[35px] text-secondary '>LBP</Text>
      </View>
      {object.lbp && amountError ? <Text className=' text-red-500 mb-1'>LBP amount cannot have numbers {'<'} 1,000. Number will automatically become {numberToMoney(minimum_1k_MoneyFormatter(object.lbp))}</Text> : null}
      <View className='flex flex-row gap-3 '>

        <Input keyboardType="numeric" placeholder='5,000' className='w-[75%] ' value={object.usd ? object.usd.toString() : undefined} onChangeText={handleUSDChangeText} />
        <Text className='text-[35px] text-secondary '>USD</Text>
      </View>
    </View>
  </View >
}
