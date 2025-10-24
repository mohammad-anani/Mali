import { router } from 'expo-router';
import React from 'react';
import Button from '../../util/Button';

export default function NewPresetButton({ isDeposit }: { isDeposit: boolean }) {

  const color = isDeposit ? "primary" : "destroy";

  return (
    <Button
      pressableProps={{
        className: `h-20 rounded-3xl bg-${color} items-center justify-center`,
        onPress: (() => {

          router.push(isDeposit ? "/app/presets/deposits/add" : "/app/presets/withdraws/add")

        })
      }}
      textProps={{
        className: " text-4xl text-secondary",
      }}
    >
      + New Preset
    </Button>
  )
}