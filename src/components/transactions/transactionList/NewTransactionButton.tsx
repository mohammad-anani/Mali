import { router } from 'expo-router';
import React from 'react';
import Button from '../../util/Button';

export default function NewTransactionButton({ isDeposit }: { isDeposit: boolean }) {

  const color = isDeposit ? "primary" : "destroy";
  const mode = isDeposit ? "Deposit" : "Withdraw"

  return (
    <Button
      pressableProps={{
        className: `h-20 rounded-3xl bg-${color} items-center justify-center`,
        onPress: (() => {

          router.push(isDeposit ? "/app/actions/deposits/add" : "/app/actions/withdraws/add")

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