import React, { ReactNode } from 'react'
import { Text } from 'react-native'
import { TextProps } from 'react-native-svg'

export default function Title(props: TextProps & { children: ReactNode, className?: string }) {
  return (
    <Text {...props} className={'text-[25px] underline ' + props.className}>{props.children}</Text>
  )
}
