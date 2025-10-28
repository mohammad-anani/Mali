import getMode from '@/src/util/getMode';
import themeColor from '@/src/util/themeColor';
import { router } from 'expo-router';
import React from 'react';
import Button from '../../util/buttons/Button';

export default function NewTransactionButton({ isDeposit = false }: { isDeposit?: boolean }) {

  const color = themeColor(isDeposit);
  const mode = getMode(isDeposit)

  return (
    <Button
      pressableProps={{
        className: `h-20 rounded-3xl ${color}  items-center justify-center`,
        onPress: (() => {

          router.push(isDeposit ? "/actions/deposits/add" : "/actions/withdraws/add")

        })


      }}
      textProps={{
        className: " text-4xl text-secondary",
      }}
    >
      + New {mode}
    </Button>
  )
}