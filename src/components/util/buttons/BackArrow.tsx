import { router } from 'expo-router';
import { CircleArrowLeft } from 'lucide-react-native';
import React from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';

export default function BackArrow({ size, color, onPress }: { size: number, color: string, onPress?: ((event: GestureResponderEvent) => void) | null | undefined }) {

  const defaultOnPress = () => { router.back() };

  return (
    <Pressable onPress={onPress ?? defaultOnPress} className={`  w-[${size}px] h-[${size}px]`}>

      <CircleArrowLeft width={size} height={size} color={color} />
    </Pressable>
  )
}

