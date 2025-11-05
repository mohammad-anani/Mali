import Modal from '@/src/components/util/containers/Modal'
import Label from '@/src/components/util/ui/Label'
import { X } from 'lucide-react-native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

export default function GuideModal({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (s: boolean) => void }) {
  return (

    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='p-6 gap-2'>
      <View className='flex-row justify-between'>

        <Text className=' underline text-[30px] font-bold'>Report Guide:</Text>
        <Pressable onPress={() => { setIsOpen(false) }}>

          <X width={40} height={40} />
        </Pressable>
      </View>
      <View className="gap-3 ">
        <View className="gap-1">
          <Label>💲 Deposits/Withdraws:</Label>
          <Text className='text-[18px]'>Sum of deposits/withdraws {"\n"} (for each of LBP and USD)</Text>
        </View>

        <View className="gap-1">
          <Label>📈 Net Balance:</Label>
          <Text className='text-[18px]'>Deposits - Withdraws {"\n"}(for each of LBP and USD)</Text>
        </View>

        <View className="gap-1">
          <Label>🏁 Final Net:</Label>
          <Text className='text-[18px]'>
            Net LBP + Net USD{"\n"}(shown in both LBP and USD based on currency rate)
          </Text>
        </View>
      </View>

    </Modal>
  )
}