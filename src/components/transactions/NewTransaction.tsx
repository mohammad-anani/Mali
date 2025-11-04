import useBalance from '@/src/hooks/useBalance';
import useKeyboard from '@/src/hooks/useKeyboard';
import React from 'react';
import { ScrollView, View } from 'react-native';
import BackArrow from '../util/buttons/BackArrow';
import Loading from '../util/state/Loading';
import Balance from './NewTransaction/Balance';
import DropDownInput from './NewTransaction/DropDownInput';
import Form from './NewTransaction/Form';
import PresetDetails from './NewTransaction/PresetDetails';
import Submit from './NewTransaction/Submit';
import useNewTransaction from './NewTransaction/useNewTransaction';


export default function NewTransaction({ isDeposit }: { isDeposit: boolean }) {
  const balances = useBalance();
  const { isLoading, isSubmitError, object, setObject, hasSubmitted, submit } = useNewTransaction(isDeposit, [balances.lbpBalance, balances.usdBalance]);


  const isKeyboardUp = useKeyboard();


  if (isLoading)
    return <>
      <BackArrow size={60} color='black' />
      <Loading size="medium" />
    </>

  return (
    <>
      <BackArrow size={!isKeyboardUp ? 60 : 30} color='black' />
      <ScrollView nestedScrollEnabled={true} >
        <View className='flex-1 justify-between gap-5'>
          <View className='gap-5'>
            <DropDownInput object={object} setObject={setObject} isDeposit={isDeposit} />
            {!object.presetID ? <Form object={object} setObject={setObject} isDeposit={isDeposit} hasSubmitted={hasSubmitted} balances={[balances.lbpBalance, balances.usdBalance]} /> : <PresetDetails object={object} />}
          </View>
          <Balance isDeposit={isDeposit} isLBP={object.isLBP} amount={object.amount} balances={[balances.lbpBalance, balances.usdBalance]} />
        </View>
      </ScrollView>
      <Submit submit={submit} isDeposit={isDeposit} isSubmitError={isSubmitError} />
    </>
  )
}


