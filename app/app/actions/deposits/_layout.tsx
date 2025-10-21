import DepositWithdrawTabs from '@/src/components/transactions/DepositWithdrawTabs'
import { secondary } from '@/src/css'
import { router, Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <DepositWithdrawTabs isWithdraw={false} setIsWithdraw={(isWithdraw) => {
      if (isWithdraw)
        router.push("/app/actions/withdraws/list")
    }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: secondary }, animation: "none" }} initialRouteName='list'  >
        <Stack.Screen name='index' options={{}} />
      </Stack>
    </DepositWithdrawTabs>
  )
}
