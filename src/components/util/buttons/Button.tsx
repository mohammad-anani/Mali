import React, { ReactNode } from 'react';
import { Pressable, PressableProps, Text, TextProps } from 'react-native';

export default function Button({ children, pressableProps, textProps }: { children: ReactNode, pressableProps?: PressableProps, textProps?: TextProps }) {
  const mergedPressableProps: PressableProps = {
    accessibilityRole: 'button',
    accessible: true,
    ...pressableProps,
  };

  return (
    <Pressable {...mergedPressableProps} >
      <Text {...textProps}>{children}</Text>
    </Pressable>
  )
}
