import useKeyboard from '@/src/hooks/useKeyboard';
import themeColor from '@/src/util/themeColor';
import React, { useRef } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import BackArrow from '../util/buttons/BackArrow';
import Button from '../util/buttons/Button';
import AmountInput from '../util/inputs/AmountInput';
import TitleInput from '../util/inputs/TitleInput';
import Loading from '../util/state/Loading';
import useNewPreset from './newPreset/useNewPreset';



export default function NewPreset({ isDeposit }: { isDeposit: boolean }) {

  const { isLoading, isSubmitError, object, setObject, hasSubmitted, submit } = useNewPreset(isDeposit);

  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);

  const isKeyboardUp = useKeyboard();


  if (isLoading)
    return <Loading size="medium" />


  const color = themeColor(isDeposit)

  return (
    <ScrollView nestedScrollEnabled={true} contentContainerClassName='flex-1'>

      <View className='flex-1 justify-between gap-5'>
        <View className='gap-5'>

          <BackArrow size={!isKeyboardUp ? 60 : 30} color='black' />
          <View className='gap-5'>

            <TitleInput inputExtraProps={{ autoFocus: true, ref: titleRef, returnKeyType: 'next', onSubmitEditing: () => amountRef.current?.focus() }} title={object.title} setTitle={(t) => { setObject(o => ({ ...o, title: t })) }} isDeposit={isDeposit} hasSubmitted={hasSubmitted} />
            <AmountInput inputExtraProps={{ ref: amountRef }} balances={[-1, -1]} isLBP={object.isLBP} setIsLBP={(c) => { setObject(o => ({ ...o, isLBP: c })) }} amount={object.amount} setAmount={(a) => { setObject(o => ({ ...o, amount: a })) }} hasSubmitted={hasSubmitted} isDeposit={isDeposit} />
          </View>
        </View>
        <Button
          pressableProps={{
            disabled: isSubmitError,
            className: `h-20 rounded-3xl ${color} items-center justify-center disabled:bg-muted`,
            onPress: submit
          }}
          textProps={{
            className: " text-4xl text-secondary",
          }}
        >
          Create
        </Button>
      </View>
    </ScrollView>
  )
}