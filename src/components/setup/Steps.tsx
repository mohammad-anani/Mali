import { initObject } from '@/app/setup';
import { Setter } from '@/src/types';
import { minimum_1k_MoneyFormatter } from '@/src/util/minimum_1k_MoneyFormatter';
import { numberToMoney } from '@/src/util/numberToMoney';
import { Text, View } from 'react-native';
import Input from '../util/Input';

export const DEFAULT_RATE = 90000;
const MIN_AMOUNT = 1000

function Intro({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {
  return <View >
    <Text className='text-[35px] text-secondary text-center'>Your Personal Financial account</Text>
  </View>
}


// function Name({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {
//   return <View className='w-full flex gap-1'>
//     <Text className='text-[35px] text-secondary ml-5'>Name:</Text>
//     <Input placeholder='John Doe...' />
//   </View>
// }


function Amounts({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {

  const amountError = object.lbp && object.lbp % MIN_AMOUNT !== 0;

  const handleLBPChangeText = (text: string) => setObject(obj => ({ ...obj, lbp: +text }))
  const handleUSDChangeText = (text: string) => setObject(obj => ({ ...obj, usd: +text }))



  return <View className='gap-3'>
    <Text className='text-[35px] text-secondary ml-5 '>Enter your balances:</Text>
    <View className='gap-3 '>
      <View className='flex flex-row gap-3'>

        <Input keyboardType="numeric" placeholder='25,000,000' className='w-[75%]' value={object.lbp ? object.lbp.toString() : undefined} onChangeText={handleLBPChangeText} />
        <Text className='text-[35px] text-secondary '>LBP</Text>
      </View>
      {object.lbp && amountError ? <Text className=' text-red-500 mb-1'>LBP amount cannot have numbers {'<'} 1,000. Number will automatically become {numberToMoney(minimum_1k_MoneyFormatter(object.lbp))}</Text> : null}
      <View className='flex flex-row gap-3 '>

        <Input keyboardType="numeric" placeholder='5,000' className='w-[75%] ' value={object.usd ? object.usd.toString() : undefined} onChangeText={handleUSDChangeText} />
        <Text className='text-[35px] text-secondary '>USD</Text>
      </View>
    </View>
  </View >
}


function Rate({ object, setObject }: { object: initObject; setObject: Setter<initObject> }) {

  const amountError = object.lbp_usdRate % MIN_AMOUNT !== 0;
  const newAmount = !object.lbp_usdRate ? DEFAULT_RATE : minimum_1k_MoneyFormatter(object.lbp_usdRate);

  const handleChangeText = (text: string) => setObject(obj => ({ ...obj, lbp_usdRate: +text }))


  return <View className='gap-3'>
    <Text className='text-[35px] text-secondary ml-5' >Exchange Rate:</Text>
    <View className='flex flex-row gap-3'>

      <Input keyboardType="numeric" placeholder='90,000' value={object.lbp_usdRate ? object.lbp_usdRate.toString() : undefined} className='w-[50%]' onChangeText={handleChangeText} />

      <Text className='text-[35px] text-secondary '>LBP/USD</Text>
    </View>

    <View className='gap-1'>

      {amountError || !newAmount ? <Text className=' text-red-500'>- LBP/USD rate cannot have numbers {'<'} 1,000. Number will automatically become {object.lbp_usdRate ? numberToMoney(newAmount) : '90,000'}</Text> : null}
      {object.lbp_usdRate < MIN_AMOUNT ? <Text className=' text-red-500'>- LBP/USD rate cannot be 0. Number will automatically become 90,000</Text> : null}
      {newAmount !== DEFAULT_RATE ? <Text className=' text-red-500 '>- This value cannot be modified later except by a Hard Reset</Text> : null}
    </View>
  </View>
}


const steps = (object: initObject, setObject: Setter<initObject>) => [
  <Intro key={0} object={object} setObject={setObject} />, <Amounts key={2} object={object} setObject={setObject} />, <Rate key={3} object={object} setObject={setObject} />
]

export default steps;