import React from 'react';
import { Text, TextInputProps, View } from 'react-native';
import Input from './Input';

export default function TitleInput({ title, isDeposit, setTitle, hasSubmitted, inputExtraProps }: { title: string, isDeposit: boolean, setTitle: (title: string) => void, hasSubmitted: boolean, inputExtraProps?: TextInputProps }) {

  const lengthError = !!(title.length && title.length < 3);
  const requiredError = hasSubmitted && !title.length
  return (
    <View className='gap-[2px]'>
      <Text className='ml-5 text-[25px] '>Title:</Text>
      <Input
        {...inputExtraProps}
        className=' h-[40px]'
        placeholder={isDeposit ? 'Salary, Gift , ...' : "Food, Rent, ..."}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      {requiredError ? <Text className=' text-red-500 mb-1 ml-5'>Title is required</Text> : null}
      {lengthError ? <Text className=' text-red-500 mb-1 ml-5'>Title must be minimum 3 characters</Text> : null}
    </View>
  )
}
