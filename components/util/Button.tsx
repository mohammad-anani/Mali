import React, { ReactNode } from 'react'
import { Pressable, PressableProps, Text, TextProps } from 'react-native'

export default function Button({ children, pressableProps, textProps }: { children: ReactNode, pressableProps?: PressableProps, textProps?: TextProps }) {
  return (
    <Pressable {...pressableProps}>
      <Text {...textProps}>{children}</Text>
    </Pressable>
  )
}
