import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'

export default function ContentView(props: ViewProps & { children?: ReactNode }) {
  return (
    <View {...props} className={'bg-secondary rounded-3xl  p-3 ' + (props.className ?? "")}>{props.children}</View>
  )
}

