import Report from '@/src/features/balance/Report';
import BalanceView from '@/src/features/home/Balance';
import Header from '@/src/features/home/Header';
import useBalance from '@/src/hooks/useBalance';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Balance() {

  const { usdBalance, lbpBalance, isError, isLoading } = useBalance();

  return (
    <ScrollView className=' flex-1 ' contentContainerClassName=' p-5 gap-6' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <Header />
      <BalanceView usdBalance={usdBalance} lbpBalance={lbpBalance} isLoading={isLoading} isError={isError} />
      <Report />
    </ScrollView>
  )
}
