import React, { useRef } from 'react'
import { TextInput, View } from 'react-native'
import AmountInput, { Balance } from '../../util/inputs/AmountInput'
import TitleInput from '../../util/inputs/TitleInput'
import { TransactionForm } from './useNewTransaction'

export default function Form({ object, setObject, hasSubmitted, isDeposit, balances }: { object: TransactionForm, setObject: React.Dispatch<React.SetStateAction<TransactionForm>>, hasSubmitted: boolean, isDeposit: boolean, balances: Balance }) {

  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);

  return (
    <View className='gap-5'>

      <TitleInput inputRef={titleRef} inputExtraProps={{ returnKeyType: 'next', onSubmitEditing: () => amountRef.current?.focus() }} title={object.title} setTitle={(t) => { setObject(o => ({ ...o, title: t })) }} isDeposit={isDeposit} hasSubmitted={hasSubmitted} />
      <AmountInput inputRef={amountRef} balances={balances} isLBP={object.isLBP} setIsLBP={(c) => { setObject(o => ({ ...o, isLBP: c })) }} amount={object.amount} setAmount={(a) => { setObject(o => ({ ...o, amount: a })) }} hasSubmitted={hasSubmitted} isDeposit={isDeposit} />
    </View>
  )
}