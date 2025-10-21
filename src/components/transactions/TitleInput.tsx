import React from 'react';
import { Text, View } from 'react-native';
import Input from '../util/Input';

export default function TitleInput({ title, isDeposit, setTitle, hasSubmitted }: { title: string, isDeposit: boolean, setTitle: (title: string) => void, hasSubmitted: boolean }) {

  const lengthError = !!(title.length && title.length < 3);
  const requiredError = hasSubmitted && !title.length
  return (
    <View className='gap-[2px]'>
      <Text className='ml-5 text-[25px]'>Title:</Text>
      <Input
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
