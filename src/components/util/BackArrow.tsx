import { CircleArrowLeft } from 'lucide-react-native'
import React from 'react'
import { GestureResponderEvent, Pressable } from 'react-native'

export default function BackArrow({ size, color, onPress }: { size: number, color: string, onPress: ((event: GestureResponderEvent) => void) | null | undefined }) {
  return (
    <Pressable onPress={onPress}>

      <CircleArrowLeft width={size} height={size} color={color} />
    </Pressable>
  )
}