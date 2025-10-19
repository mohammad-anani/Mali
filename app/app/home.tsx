import { getTotalLBPBalance, getTotalUSDBalance } from '@/backend/business-layer/transactions/balance';
import QuickTransaction from '@/src/components/transactions/QuickTransaction';
import ContentView from '@/src/components/util/ContentView';
import Logo from '@/src/components/util/Logo';
import LogoName from '@/src/components/util/LogoName';
import Title from '@/src/components/util/Title';
import { numberToMoney } from '@/src/util/numberToMoney';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Home() {


  const [usdBalance, setUSDBalance] = useState(0);
  const [lbpBalance, setLBPBalance] = useState(0);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {



    async function getBalances() {

      setLBPBalance(await getTotalLBPBalance());
      setUSDBalance(await getTotalUSDBalance());
      setRefresh(false);

    }
    getBalances()

  }, [usdBalance, lbpBalance, refresh])


  return (
    <ScrollView stickyHeaderIndices={[1]} className=' flex-1 ' contentContainerClassName=' p-5 gap-6' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View className='gap-3 flex flex-row items-center'>

        <Logo className='h-[60px] w-[60px]' />
        <LogoName className='h-[40px] w-[100px] aspect-[2/1] ' />
      </View>
      <View className='bg-background py-3'>

        <ContentView >
          <Title className=''>Balance:</Title>
          <View className='items-center py-2'>
            <Text className='text-[30px] '>{numberToMoney(lbpBalance)} LBP</Text>
            <Text className='text-[30px]  '>{numberToMoney(usdBalance)} USD</Text>

          </View>
        </ContentView>
      </View>
      <QuickTransaction setRefresh={setRefresh} balances={[lbpBalance, usdBalance]} mode='Deposit' />

      <QuickTransaction setRefresh={setRefresh} balances={[lbpBalance, usdBalance]} mode='Withdraw' />
    </ScrollView>
  )
}
