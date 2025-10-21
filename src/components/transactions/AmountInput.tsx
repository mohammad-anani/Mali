import { MIN_AMOUNT } from '@/src/util/constants';
import React from 'react';
import { Text, View } from 'react-native';
import Input from '../util/Input';
import CurrencyToggle from './CurrencyToggle';

export default function AmountInput({ amount, isLBP, balances, isDeposit, hasSubmitted, setAmount, setIsLBP }: { amount: number | null, isLBP: boolean, balances: [number, number], isDeposit: boolean, hasSubmitted: boolean, setIsLBP: (c: boolean) => void, setAmount: (a: number | null) => void }) {


  const amountError = !!(isLBP && amount && amount % MIN_AMOUNT !== 0);
  const requiredError = hasSubmitted && !amount
  return (
    <View className='gap-[2px]'>

      <Text className='ml-5 text-[25px]'>Amount:</Text>
      <View className='flex-row  gap-3 items-stretch'>

        <Input
          className=' flex-1'
          placeholder='25,000'
          keyboardType='numeric'
          value={amount !== null ? String(amount) : ''}
          onChangeText={text => setAmount(amount)}
        />
        <CurrencyToggle isToggled={!isLBP} setIsToggled={(isToggled) => { setIsLBP(!isToggled) }} isDeposit={isDeposit} />
      </View>
      {requiredError ? <Text className=' text-red-500 mb-1 ml-5'>Amount is required</Text> : null}
      {amount && !isDeposit && (isLBP && amount > balances[0] || !isLBP && amount > balances[1]) ? <Text className=' text-red-500 mb-1 ml-5'>Amount to withdraw cannot exceed balance ({balances[isLBP ? 0 : 1]})</Text> : null}
      {amountError ? <Text className=' text-red-500 mb-1 ml-5'>LBP amount cannot have numbers {'<'} 1,000.</Text> : null}
    </View>
  )
}