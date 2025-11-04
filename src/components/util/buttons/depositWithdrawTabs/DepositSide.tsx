import { primary, primaryDark } from '@/src/css'
import ROUTES from '@/src/dicts/routes'
import { ExternalPathString, router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function DepositSide({ isDeposit, mode }: { isDeposit: boolean, mode: "Action" | "Preset" }) {
  return (
    <Pressable
      className="flex flex-row justify-between w-[50%] absolute top-0 left-0"
      style={{ zIndex: isDeposit ? 10 : 0 }}
      onPress={() => router.push((mode === "Action" ? ROUTES.actions : ROUTES.presets).of.path(true) as ExternalPathString)}
    >
      <View
        className={`h-20 w-[80%] justify-center ${isDeposit ? 'bg-primary' : 'bg-primaryDark'
          }`}
      >
        <Text className="text-secondary ml-5 text-3xl">Deposits</Text>
      </View>
      <View
        style={[
          triangleLeft.triangle,
          { borderTopColor: isDeposit ? primary : primaryDark }, // uses primaryDark when inactive
        ]}
      />
    </Pressable>
  )
}

const triangleLeft = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 70,
    borderTopWidth: 70,
    borderRightColor: 'transparent',
    transform: [{ rotate: '270deg' }],
  },
});
