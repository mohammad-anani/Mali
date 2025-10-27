import DepositWithdrawTabs from '@/src/components/util/containers/DepositWithdrawTabs'
import { secondary } from '@/src/css'
import { router, Stack } from 'expo-router'
import React from 'react'

export default function _layout() {

  const setIsWithdraw = (isWithdraw: boolean) => {
    if (!isWithdraw)
      router.push("/actions/deposits/list")
  }


  return (
    <DepositWithdrawTabs isWithdraw={true} setIsWithdraw={setIsWithdraw}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: secondary }, animation: "fade" }} initialRouteName='list' />
    </DepositWithdrawTabs>
  )
}
