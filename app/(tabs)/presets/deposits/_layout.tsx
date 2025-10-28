import DepositWithdrawTabs from '@/src/components/util/containers/DepositWithdrawTabs'
import { secondary } from '@/src/css'
import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {



  return (
    <DepositWithdrawTabs isDeposit >
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: secondary }, animation: "fade" }} initialRouteName='list' />
    </DepositWithdrawTabs>
  )
}
