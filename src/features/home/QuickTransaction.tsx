import Button from '@/src/components/util/buttons/Button';
import ContentView from '@/src/components/util/containers/ContentView';
import AmountInput from '@/src/components/util/inputs/AmountInput';
import TitleInput from '@/src/components/util/inputs/TitleInput';
import Loading from '@/src/components/util/state/Loading';
import Title from '@/src/components/util/ui/Title';
import useQuickTransaction from '@/src/features/home/useQuickTransaction';
import React, { useRef } from 'react';
import { TextInput, View } from 'react-native';




export default function QuickTransaction({ isDeposit = false, balances }: { isDeposit?: boolean, balances: [number | null, number | null] }) {




  const { mode, object, setObject, hasSubmitted, isSubmitError, submit, isLoading } = useQuickTransaction(isDeposit);


  const amountRef = useRef<TextInput>(null);

  if (isLoading)
    return <ContentView className='gap-2' >
      <Loading size="small" />
    </ContentView>



  return (
    <View>

      <ContentView className='gap-2' >
        <Title>Quick {mode}:</Title>

        <View className='gap-3'>
          <TitleInput title={object.title} setTitle={(t) => { setObject(o => ({ ...o, title: t })) }} hasSubmitted={hasSubmitted} isDeposit={isDeposit} inputExtraProps={{ returnKeyType: "next", onSubmitEditing: () => { amountRef.current?.focus() } }} />

          <AmountInput inputExtraProps={{ ref: amountRef }} amount={object.amount} isLBP={object.isLBP} setAmount={(a) => { setObject(o => ({ ...o, amount: a })) }} setIsLBP={(c) => { setObject(o => ({ ...o, isLBP: c })) }} hasSubmitted={hasSubmitted} balances={balances} isDeposit={isDeposit} />

          <View className='flex-row justify-end'>
            <Button pressableProps={{ className: `${isDeposit ? "bg-primary" : "bg-destroy"} rounded-full w-[190px] h-[60px] justify-center disabled:bg-muted`, disabled: isSubmitError, onPress: submit }} textProps={{ className: "text-[30px] text-center text-secondary" }}>{mode}</Button>
          </View>
        </View>
      </ContentView>
    </View>
  )
}


//in home make balance sticky


