import { destroy, primary } from '@/src/css';
import useBalance from '@/src/hooks/useBalance';
import useKeyboard from '@/src/hooks/useKeyboard';
import getMode from '@/src/util/getMode';
import { numberToMoney } from '@/src/util/numberToMoney';
import themeColor from '@/src/util/themeColor';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import BackArrow from '../util/buttons/BackArrow';
import Button from '../util/buttons/Button';
import AmountInput from '../util/inputs/AmountInput';
import TitleInput from '../util/inputs/TitleInput';
import Error from '../util/state/Error';
import Loading from '../util/state/Loading';
import Title from '../util/ui/Title';
import useNewTransaction from './NewTransaction/useNewTransaction';


export default function NewTransaction({ isDeposit }: { isDeposit: boolean }) {
  const balances = useBalance();
  const { isLoading, isSubmitError, object, setObject, hasSubmitted, submit, presetsList } = useNewTransaction(isDeposit, [balances.lbpBalance, balances.usdBalance]);

  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);
  const isKeyboardUp = useKeyboard();


  if (isLoading)
    return <Loading size="medium" />


  const color = themeColor(isDeposit)

  const balance = object.isLBP ? balances.lbpBalance : balances.usdBalance;

  if (!balance)
    return <Error message="Couldn't retreive balance!" />

  const currency = object.isLBP ? "LBP" : "USD";

  const amount = (object.amount ?? 0) * (isDeposit ? 1 : -1);

  const result = balance + amount

  const resultingBalance = result >= 0 ? numberToMoney(result) + " " + currency : "Insufficient funds"
  return (
    <>
      <BackArrow size={!isKeyboardUp ? 60 : 30} color='black' />
      <ScrollView nestedScrollEnabled={true} >
        <View className='flex-1 justify-between gap-5'>
          <View className='gap-5'>
            <View className='gap-[2px]'>
              <Text className='ml-5 text-[25px] '>Select a Preset:</Text>
              <View className='bg-white rounded-[30px] justify-center px-5 h-[55px] '>

                <Dropdown
                  data={presetsList}
                  labelField="label"
                  searchQuery={(keyword, value) => value.toLowerCase().includes(keyword.toLocaleLowerCase())}
                  valueField="value"
                  activeColor={isDeposit ? primary : destroy
                  }
                  placeholder="Select Preset"
                  value={object.presetID ?? 0}
                  onChange={(item) => {
                    setObject(o => ({ ...o, presetID: +item.value }))
                  }}

                  search
                  searchPlaceholder="Search..."
                  inputSearchStyle={styles.inputSearchStyle}
                  placeholderStyle={styles.placeholder}
                  selectedTextStyle={styles.selectedText}
                  itemTextStyle={styles.itemTextStyle}
                  containerStyle={styles.dropdownContainer}
                  iconStyle={styles.icon}

                />
              </View>
            </View>

            {!object.presetID ? <View className='gap-5'>

              <TitleInput inputRef={titleRef} inputExtraProps={{ returnKeyType: 'next', onSubmitEditing: () => amountRef.current?.focus() }} title={object.title} setTitle={(t) => { setObject(o => ({ ...o, title: t })) }} isDeposit={isDeposit} hasSubmitted={hasSubmitted} />
              <AmountInput inputRef={amountRef} balances={[balances.lbpBalance, balances.usdBalance]} isLBP={object.isLBP} setIsLBP={(c) => { setObject(o => ({ ...o, isLBP: c })) }} amount={object.amount} setAmount={(a) => { setObject(o => ({ ...o, amount: a })) }} hasSubmitted={hasSubmitted} isDeposit={isDeposit} />
            </View> : <>

              <View className='gap-[2px]'>
                <Text className='ml-5 text-[25px] underline'>Title:</Text>


                <Text className='text-[22px] px-5 h-[55px]'>{object.title}</Text>


              </View>

              <View className='gap-[2px]'>
                <Text className='ml-5 text-[25px] underline'>Amount:</Text>


                <Text className='text-[22px] px-5 h-[55px]'>{numberToMoney(object.amount ?? "")} {object.isLBP ? "LBP" : "USD"}</Text>


              </View>
            </>}
          </View>
          <View className='px-2'>
            <View>
              <Title>Current Balance:</Title>
              <Text className={`text-[25px] text-center`}>{object.isLBP ? numberToMoney(balances.lbpBalance ?? "") + " LBP" : numberToMoney(balances.usdBalance ?? "") + " USD"}</Text>
            </View>
            {
              object.amount ?
                <View>
                  <Title >Resulting Balance</Title>
                  <Text className={`text-[25px]  text-center ${themeColor(isDeposit, "text-")}`}>{resultingBalance}</Text>
                </View>
                : <></>}
          </View>
        </View>
      </ScrollView>
      <Button
        pressableProps={{
          disabled: isSubmitError,
          className: `h-20 rounded-3xl mt-[5px] ${color} items-center justify-center disabled:bg-muted`,
          onPress: submit
        }}
        textProps={{
          className: " text-4xl text-secondary",
        }}
      >
        {getMode(isDeposit)}
      </Button>
    </>
  )
}


const styles = StyleSheet.create({
  container: {

  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: 55,
    paddingHorizontal: 20,

  },
  placeholder: {
    fontSize: 22,
    color: '#999',

  },
  selectedText: {
    fontSize: 22,

  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,

  },
  itemTextStyle: {
    fontSize: 16,

  },
  dropdownContainer: {
    borderRadius: 8,

  },
  icon:
  {
    width: 30
  }
});