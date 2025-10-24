import DepositWithdrawTabs from '@/src/components/util/DepositWithdrawTabs'
import { secondary } from '@/src/css'
import { router, Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <DepositWithdrawTabs isWithdraw={true} setIsWithdraw={(isWithdraw) => {
      if (!isWithdraw)
        router.push("/actions/deposits/list")
    }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: secondary }, animation: "fade" }} initialRouteName='list' />
    </DepositWithdrawTabs>
  )
}
