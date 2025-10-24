import { Smile } from 'lucide-react-native'
import React, { ReactNode } from 'react'
import { Text, View } from 'react-native'

export default function EmptyList({ entity, children }: { entity: string, children?: ReactNode }) {
  return (
    <View className="mt-[40%] flex-1 justify-center items-center gap-4">
      <View className=' justify-center items-center'>

        <Smile width={50} height={50} />
        <Text className=" text-xl">No {entity} yet!</Text>
      </View>
      <View className='flex-1  w-[80%]'>

        {children}
      </View>
    </View>
  )
}