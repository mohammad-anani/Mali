import React, { ReactNode } from 'react'
import { Text } from 'react-native'
import { TextProps } from 'react-native-svg'

export default function Label(props: TextProps & { children: ReactNode, className?: string }) {
  return (
    <Text {...props} className={"underline text-2xl" + props.className}>{props.children}</Text>
  )
}