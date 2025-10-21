import { Frown } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

export default function Error({ message }: { message?: string }) {
  return (
    <View className="flex flex-col  items-center   ">
      <Frown width={50} height={50} />
      <Text className='text-xl'>Error: {message ?? "Something wrong happened."}</Text>
    </View>
  )
}

