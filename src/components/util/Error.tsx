import { Frown } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

export default function Error({ message }: { message?: string }) {
  return (

    <View className="flex flex-col  items-center justify-center flex-1">
      <Frown width={50} height={50} />
      <Text className='text-xl text-center'>Error: {message ?? "Something wrong happened."}</Text>
    </View>
  )
}

