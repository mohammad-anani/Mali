import { destroy, destroyDark } from '@/src/css'
import ROUTES from '@/src/dicts/routes'
import { ExternalPathString, router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function WithdrawSide({ isDeposit, mode }: { isDeposit: boolean, mode: "Action" | "Preset" }) {
  return (
    <Pressable
      className="flex flex-row justify-end w-[50%] absolute top-0 right-0"
      style={{ zIndex: isDeposit ? 0 : 10 }}
      onPress={() => router.push((mode === "Action" ? ROUTES.actions : ROUTES.presets).of.path(false) as ExternalPathString)}
    >
      <View
        style={[
          triangleRight.triangle,
          { borderTopColor: isDeposit ? destroyDark : destroy }, // uses destroyDark when inactive
        ]}
      />
      <View
        className={`h-20 w-[80%] justify-center ${isDeposit ? 'bg-destroyDark ' : 'bg-destroy'
          }`}
      >
        <Text className="text-secondary text-right mr-5 text-3xl">
          Withdraws
        </Text>
      </View>
    </Pressable>
  )
}

const triangleRight = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 70,
    borderTopWidth: 70,
    borderRightColor: 'transparent',
    transform: [{ rotate: '180deg' }],
  },
});
