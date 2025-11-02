import { Preset } from '@/backend/business-layer/presets/Preset';
import themeColor from '@/src/util/themeColor';
import React, { useRef } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import Button from '../util/buttons/Button';
import AmountInput from '../util/inputs/AmountInput';
import TitleInput from '../util/inputs/TitleInput';
import Loading from '../util/state/Loading';
import useAddUpdatePreset from './addUpdatePreset/useAddUpdatePreset';



export default function AddUpdatePreset({ isDeposit, preset = null }: { isDeposit: boolean, preset?: Preset | null }) {

  const { isLoading, isSubmitError, object, setObject, hasSubmitted, submit } = useAddUpdatePreset(isDeposit, preset);

  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);


  if (isLoading)
    return <Loading size="medium" />


  const color = themeColor(isDeposit)

  return (
    <ScrollView nestedScrollEnabled={true} contentContainerClassName='flex-1'>

      <View className='flex-1 justify-between gap-5'>
        <View className='gap-5'>

          <View className='gap-5'>

            <TitleInput inputExtraProps={{ autoFocus: true, returnKeyType: 'next', onSubmitEditing: () => amountRef.current?.focus() }} inputRef={titleRef} title={object.title} setTitle={(t) => { setObject(o => ({ ...o, title: t })) }} isDeposit={isDeposit} hasSubmitted={hasSubmitted} />
            <AmountInput inputExtraProps={{}} inputRef={amountRef} balances={[-1, -1]} isLBP={object.isLBP} setIsLBP={(c) => { setObject(o => ({ ...o, isLBP: c })) }} amount={object.amount} setAmount={(a) => { setObject(o => ({ ...o, amount: a })) }} hasSubmitted={hasSubmitted} isDeposit={isDeposit} />
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
          {preset ? "Update" : "Create"}
        </Button>
      </View>
    </ScrollView>
  )
}