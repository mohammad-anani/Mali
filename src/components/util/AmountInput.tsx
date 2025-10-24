import { MIN_AMOUNT } from '@/src/util/constants';
import { numberToMoney } from '@/src/util/numberToMoney';
import React from 'react';
import { Text, View } from 'react-native';
import CurrencyToggle from './CurrencyToggle';
import Error from './Error';
import Input from './Input';

export default function AmountInput({ amount, isLBP, balances, isDeposit, hasSubmitted, setAmount, setIsLBP }: { amount: number | null, isLBP: boolean, balances: [number | null, number | null], isDeposit: boolean, hasSubmitted: boolean, setIsLBP: (c: boolean) => void, setAmount: (a: number | null) => void }) {


  const amountError = !!(isLBP && amount && amount % MIN_AMOUNT !== 0);
  const requiredError = hasSubmitted && !amount;
  const balance = balances[isLBP ? 0 : 1];

  if (!balance && !isDeposit) {
    return <Error message='Balance could not be retreived.Withdraw cannot be done.' />
  }

  const withdrawExceedsBalance = amount && !isDeposit && balance && amount > balance;


  return (
    <View className='gap-[2px]'>

      <Text className='ml-5 text-[25px]'>Amount:</Text>
      <View className='flex-row  gap-3 items-stretch'>

        <Input
          className=' flex-1'
          placeholder='25,000'
          keyboardType='numeric'
          value={amount !== null ? String(amount) : ''}
          onChangeText={text => setAmount(text.length ? +text : null)}
        />
        <CurrencyToggle isToggled={!isLBP} setIsToggled={(isToggled) => { setIsLBP(!isToggled) }} isDeposit={isDeposit} />
      </View>
      {requiredError ? <Text className=' text-red-500 mb-1 ml-5'>Amount is required</Text> : null}
      {withdrawExceedsBalance ? <Text className=' text-red-500 mb-1 ml-5'>Amount to withdraw cannot exceed {"\n" + numberToMoney(amount) + " " + (isLBP ? "LBP" : "USD")}</Text> : null}
      {amountError ? <Text className=' text-red-500 mb-1 ml-5'>LBP amount cannot have numbers {'<'} 1,000.</Text> : null}
    </View>
  )
}