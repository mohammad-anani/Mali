import React from 'react'
import { TextInput, TextInputProps } from 'react-native'

export default function Input(props: TextInputProps) {
  return (
    <TextInput {...props} multiline={false} scrollEnabled={false} placeholderTextColor="#CCCCCC" className={'bg-white rounded-[30px] text-[22px] px-5 h-[55px] ' + ' ' + props.className} />
  )
}
