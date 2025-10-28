import { initObject } from '@/src/features/setup/useSetup';
import { Setter } from '@/src/types';
import { minimum_1k_MoneyFormatter } from '@/src/util/minimum_1k_MoneyFormatter';
import { numberToMoney } from '@/src/util/numberToMoney';
import React, { useRef } from 'react';
import { Text, TextInput, View } from 'react-native';
import Input from '../../components/util/inputs/Input';
import { DEFAULT_RATE, MIN_AMOUNT } from '../../util/constants';

export default function Rate({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {

  const rateRef = useRef<TextInput>(null);

  const amountError = object.lbp_usdRate % MIN_AMOUNT !== 0;
  const newAmount = !object.lbp_usdRate ? DEFAULT_RATE : minimum_1k_MoneyFormatter(object.lbp_usdRate);

  const handleChangeText = (text: string) => setObject(obj => ({ ...obj, lbp_usdRate: +text }))


  return <View className='gap-3'>
    <Text className='text-[35px] text-secondary ml-5' >Exchange Rate:</Text>
    <View className='flex flex-row gap-3'>

      <Input ref={rateRef} autoFocus keyboardType="numeric" placeholder='90,000' value={object.lbp_usdRate ? object.lbp_usdRate.toString() : undefined} className='w-[50%]' onChangeText={handleChangeText} returnKeyType='done' />

      <Text className='text-[35px] text-secondary '>LBP/USD</Text>
    </View>

    <View className='gap-1'>

      {amountError || !newAmount ? <Text className=' text-red-500'>- LBP/USD rate cannot have numbers {'<'} 1,000. Number will automatically become {object.lbp_usdRate ? numberToMoney(newAmount) : '90,000'}</Text> : null}
      {object.lbp_usdRate < MIN_AMOUNT ? <Text className=' text-red-500'>- LBP/USD rate cannot be 0. Number will automatically become 90,000</Text> : null}
      {newAmount !== DEFAULT_RATE ? <Text className=' text-red-500 '>- This value cannot be modified later except by a Hard Reset</Text> : null}
    </View>
  </View>
}
