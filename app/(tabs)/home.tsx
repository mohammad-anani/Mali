import Balance from '@/src/features/home/Balance';
import Header from '@/src/features/home/Header';
import QuickTransaction from '@/src/features/home/QuickTransaction';
import useBalance from '@/src/hooks/useBalance';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Home() {


  const { usdBalance, lbpBalance, isError, isLoading } = useBalance();

  return (
    <ScrollView stickyHeaderIndices={[1]} className=' flex-1 ' contentContainerClassName=' p-5 gap-6' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <Header />
      <Balance usdBalance={usdBalance} lbpBalance={lbpBalance} isLoading={isLoading} isError={isError} />
      <QuickTransaction balances={[lbpBalance, usdBalance]} isDeposit />
      <QuickTransaction balances={[lbpBalance, usdBalance]} />
    </ScrollView>
  )
}
