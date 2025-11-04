import { numberToMoney } from '@/src/util/numberToMoney'
import themeColor from '@/src/util/themeColor'
import React from 'react'
import { Text, View } from 'react-native'
import { Balance as BalanceType } from '../../util/inputs/AmountInput'
import Error from '../../util/state/Error'
import Title from '../../util/ui/Title'

export default function Balance({ balances, isLBP, amount, isDeposit }: { balances: BalanceType, isLBP: boolean, amount: number | null, isDeposit: boolean }) {

  const balance = isLBP ? balances[0] : balances[1];

  if (!balance)
    return <Error message="Couldn't retreive balance!" />

  const currency = isLBP ? "LBP" : "USD";

  const calculated_amount = (amount ?? 0) * (isDeposit ? 1 : -1);

  const result = balance + calculated_amount;

  const resultingBalance = result >= 0 ? numberToMoney(result) + " " + currency : "Insufficient funds"

  return (
    <View className='px-2'>
      <View>
        <Title>Current Balance:</Title>
        <Text className={`text-[25px] text-center`}>{isLBP ? numberToMoney(balances[0] ?? "") + " LBP" : numberToMoney(balances[1] ?? "") + " USD"}</Text>
      </View>
      {
        amount ?
          <View>
            <Title >Resulting Balance</Title>
            <Text className={`text-[25px]  text-center ${themeColor(isDeposit, "text-")}`}>{resultingBalance}</Text>
          </View>
          : <></>}
    </View>
  )
}