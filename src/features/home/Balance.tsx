import ContentView from '@/src/components/util/ContentView'
import Error from '@/src/components/util/Error'
import Loading from '@/src/components/util/Loading'
import Title from '@/src/components/util/Title'
import { numberToMoney } from '@/src/util/numberToMoney'
import React from 'react'
import { Text, View } from 'react-native'

export default function Balance({ usdBalance, lbpBalance, isLoading = false, isError = false }: { usdBalance: number | null, lbpBalance: number | null, isLoading: boolean, isError?: boolean }) {


  const error = isError || !usdBalance || !lbpBalance

  return (
    <View className='bg-background py-3'>

      <ContentView >
        <Title className=''>Balance:</Title>
        <View className='items-center py-2'>
          {
            isLoading ? <Loading size="small" /> : error ? <Error /> :
              <>
                <Text className='text-[30px] '>{numberToMoney(lbpBalance)} LBP</Text>
                <Text className='text-[30px]  '>{numberToMoney(usdBalance)} USD</Text>
              </>



          }
        </View>
      </ContentView>
    </View>
  )
}

