import AmountInput from '@/src/components/util/AmountInput';
import Button from '@/src/components/util/Button';
import ContentView from '@/src/components/util/ContentView';
import Title from '@/src/components/util/Title';
import TitleInput from '@/src/components/util/TitleInput';
import useQuickTransaction from '@/src/features/home/useQuickTransaction';
import React from 'react';
import { View } from 'react-native';




export default function QuickTransaction({ mode, balances }: { mode: "Deposit" | "Withdraw", balances: [number | null, number | null] }) {




  const { isDeposit, object, setObject, hasSubmitted, isSubmitError, submit } = useQuickTransaction(mode);


  return (
    <View>

      <ContentView className='gap-2' >
        <Title>Quick {mode}:</Title>

        <View className='gap-3'>
          <TitleInput title={object.title} setTitle={(t) => { setObject(o => ({ ...o, title: t })) }} hasSubmitted={hasSubmitted} isDeposit={isDeposit} />

          <AmountInput amount={object.amount} isLBP={object.isLBP} setAmount={(a) => { setObject(o => ({ ...o, amount: a })) }} setIsLBP={(c) => { setObject(o => ({ ...o, isLBP: c })) }} hasSubmitted={hasSubmitted} balances={balances} isDeposit={isDeposit} />

          <View className='flex-row justify-end'>
            <Button pressableProps={{ className: `${isDeposit ? "bg-primary" : "bg-destroy"} rounded-full w-[190px] h-[60px] justify-center disabled:bg-muted`, disabled: isSubmitError, onPress: submit }} textProps={{ className: "text-[30px] text-center text-secondary" }}>{mode}</Button>
          </View>
        </View>
      </ContentView>
    </View>
  )
}


//in home make balance sticky


