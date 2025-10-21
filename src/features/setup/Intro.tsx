import { initObject } from '@/src/features/setup/useSetup';
import { Setter } from '@/src/types';
import React from 'react';
import { Text, View } from 'react-native';

export default function Intro({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {
  return (
    <View>
      <Text className='text-[35px] text-secondary text-center'>Your Personal Financial account</Text>
    </View>
  );
}
