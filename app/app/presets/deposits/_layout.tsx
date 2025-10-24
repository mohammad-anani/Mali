import DepositWithdrawTabs from '@/src/components/util/DepositWithdrawTabs'
import { secondary } from '@/src/css'
import { router, Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <DepositWithdrawTabs isWithdraw={false} setIsWithdraw={(isWithdraw) => {
      if (isWithdraw)
        router.push("/app/presets/withdraws/list")
    }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: secondary }, animation: "fade" }} initialRouteName='list'  >
        <Stack.Screen name='index' options={{}} />
      </Stack>
    </DepositWithdrawTabs>
  )
}
