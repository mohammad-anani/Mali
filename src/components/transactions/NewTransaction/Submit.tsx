import getMode from '@/src/util/getMode'
import themeColor from '@/src/util/themeColor'
import React from 'react'
import Button from '../../util/buttons/Button'

export default function Submit({ isDeposit, isSubmitError, submit }: { isDeposit: boolean, isSubmitError: boolean, submit: () => void }) {


  const color = themeColor(isDeposit)

  return (
    <Button
      pressableProps={{
        disabled: isSubmitError,
        className: `h-20 rounded-3xl mt-[5px] ${color} items-center justify-center disabled:bg-muted`,
        onPress: submit
      }}
      textProps={{
        className: " text-4xl text-secondary",
      }}
    >
      {getMode(isDeposit)}
    </Button>
  )
}