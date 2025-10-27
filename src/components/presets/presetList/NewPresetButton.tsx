import themeColor from '@/src/util/themeColor';
import { router } from 'expo-router';
import React from 'react';
import Button from '../../util/buttons/Button';

export default function NewPresetButton({ isDeposit }: { isDeposit: boolean }) {

  const color = themeColor(isDeposit)
  const onPressfn = (() => {

    router.push(isDeposit ? "/presets/deposits/add" : "/presets/withdraws/add")
  })

  return (
    <Button
      pressableProps={{
        className: `h-20 rounded-3xl bg-${color} items-center justify-center`,
        onPress: onPressfn
      }}
      textProps={{
        className: " text-4xl text-secondary",
      }}
    >
      + New Preset
    </Button>
  )
}