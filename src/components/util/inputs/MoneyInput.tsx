import { moneyToString } from '@/src/util/moneyToString';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import Input from './Input';

type MoneyInputProps = TextInputProps;

export default function MoneyInput(props: MoneyInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (text: string) => {
    const formatted = moneyToString(text);
    setValue(formatted);
    props.onChangeText && props.onChangeText(formatted);
  };

  return (

    <Input
      {...props}
      value={value}
      onChangeText={handleChange}
      keyboardType={props.keyboardType || 'numeric'}
    />
  );
}
