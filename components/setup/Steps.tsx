import { initObject } from '@/app/setup';
import { Setter } from '@/types';
import { Text, View } from 'react-native';
import Input from '../util/Input';



function Intro({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {
  return <View >
    <Text className='text-[35px] text-secondary text-center'>Your Personal Financial account</Text>
  </View>
}


function Name({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {
  return <View className='w-full flex gap-1'>
    <Text className='text-[35px] text-secondary ml-5'>Name:</Text>
    <Input placeholder='John Doe...' />
  </View>
}


function Amounts({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {
  return <View className='gap-3'>
    <Text className='text-[35px] text-secondary ml-5 '>Enter your balances:</Text>
    <View className='gap-3'>
      <View className='flex flex-row gap-3'>

        <Input placeholder='25,000,000' className='w-[80%]' />
        <Text className='text-[35px] text-secondary '>LBP</Text>
      </View>
      <View className='flex flex-row gap-3'>

        <Input placeholder='5,000' className='w-[80%]' />
        <Text className='text-[35px] text-secondary '>USD</Text>
      </View>
    </View>
  </View >
}


function Rate({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {
  return <View className='gap-3'>
    <Text className='text-[35px] text-secondary ml-5'>Exchange Rate:</Text>
    <View className='flex flex-row gap-3'>

      <Input placeholder='90,000' value='90,000' className='w-[60%]' />

      <Text className='text-[35px] text-secondary '>LBP/USD</Text>
    </View>


    {/* <Text>⚠️ This value cannot be modified later except by a Hard Reset</Text> */}
  </View>
}


const steps = (object: initObject, setObject: Setter<initObject>) => [
  <Intro key={0} object={object} setObject={setObject} />, <Name key={1} object={object} setObject={setObject} />, <Amounts key={2} object={object} setObject={setObject} />, <Rate key={3} object={object} setObject={setObject} />
]

export default steps;