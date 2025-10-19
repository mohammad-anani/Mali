import { AddDeposit, AddDepositSchema, createDeposit } from '@/backend/business-layer/transactions/Deposit'
import { AddWithdraw, AddWithdrawSchema, createWithdraw } from '@/backend/business-layer/transactions/Withdraw'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { MIN_AMOUNT } from '../setup/Steps'
import Button from '../util/Button'
import ContentView from '../util/ContentView'
import Input from '../util/Input'
import Title from '../util/Title'
import Toggle from '../util/Toggle'

type QuickTransactionForm = {
  title: string,
  amount: number | null
  isLBP: boolean,
}

export default function QuickTransaction({ mode, balances, setRefresh }: { mode: "Deposit" | "Withdraw", balances: [number, number], setRefresh: (refresh: boolean) => void }) {






  const [isSubmitClicked, setIsSubmitClicked] = useState(false);


  useEffect(() => {
    if (!isSubmitClicked) return;

    const timeout = setTimeout(() => {
      setIsSubmitClicked(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isSubmitClicked]);


  const [object, setObject] = useState<QuickTransactionForm>({ title: "", amount: null, isLBP: true });

  const amountError = !!(object.isLBP && object.amount && object.amount % MIN_AMOUNT !== 0);
  const titleError = !!(object.title.length && object.title.length < 3);

  const isDeposit = mode === "Deposit";


  const amountErrorAfterSubmit = isSubmitClicked && !object.amount
  const textErrorAfterSubmit = isSubmitClicked && !object.title.length

  const isSubmitError = amountError || textErrorAfterSubmit;

  async function submit() {
    setIsSubmitClicked(true);

    const data = { ...object, presetID: null } as AddDeposit | AddWithdraw;

    const schema = isDeposit ? AddDepositSchema : AddWithdrawSchema;

    const parseResult = schema.safeParse(data);

    if (!parseResult.success) {
      console.log(parseResult.error.format());
      return false;
    }

    const action = isDeposit ? createDeposit : createWithdraw

    const id = await action(data);

    setObject({ title: "", amount: null, isLBP: true });
    setIsSubmitClicked(false);

    if (id) {
      console.log(id);

      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: `${mode} done successfully`
      });
      setRefresh(true);
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: `${mode} failed.Please try again later`
      });
    }

  }

  return (
    <Pressable onPress={() => { scrollTo(0, 100) }}>

      <ContentView className='gap-2' >
        <Title>Quick {mode}:</Title>
        <View className='gap-3'>
          <View className='gap-[2px]'>
            <Text className='ml-5 text-[25px]'>Title:</Text>
            <Input
              className=' h-[40px]'
              placeholder={isDeposit ? 'Salary, Gift , ...' : "Food, Rent, ..."}
              value={object.title}
              onChangeText={text => setObject(o => ({ ...o, title: text }))}
            />
            {textErrorAfterSubmit ? <Text className=' text-red-500 mb-1 ml-5'>Title is required</Text> : null}
            {titleError ? <Text className=' text-red-500 mb-1 ml-5'>Title must be minimum 3 characters</Text> : null}
          </View>
          <View className='gap-[2px]'>

            <Text className='ml-5 text-[25px]'>Amount:</Text>
            <View className='flex-row  gap-3 items-stretch'>

              <Input
                className=' flex-1'
                placeholder='25,000'
                keyboardType='numeric'
                value={object.amount !== null ? String(object.amount) : ''}
                onChangeText={text => setObject(o => ({ ...o, amount: text === '' ? null : Number(text) }))}
              />
              <Toggle isToggled={!object.isLBP} setIsToggled={(isToggled) => { setObject((o) => ({ ...o, isLBP: !isToggled })) }} isDeposit={isDeposit} />
            </View>
            {amountErrorAfterSubmit ? <Text className=' text-red-500 mb-1 ml-5'>Amount is required</Text> : null}
            {object.amount && !isDeposit && (object.isLBP && object.amount > balances[0] || !object.isLBP && object.amount > balances[1]) ? <Text className=' text-red-500 mb-1 ml-5'>Amount to withdraw cannot exceed balance ({balances[object.isLBP ? 0 : 1]})</Text> : null}
            {amountError ? <Text className=' text-red-500 mb-1 ml-5'>LBP amount cannot have numbers {'<'} 1,000.</Text> : null}
          </View>
          <View className='flex-row justify-end'>
            <Button pressableProps={{ className: `${isDeposit ? "bg-primary" : "bg-destroy"} rounded-full w-[190px] h-[60px] justify-center disabled:bg-muted`, disabled: isSubmitError || amountError || titleError, onPress: submit }} textProps={{ className: "text-[30px] text-center text-secondary" }}>{mode}</Button>
          </View>
        </View>
      </ContentView>
    </Pressable>
  )
}


//in home make balance sticky


