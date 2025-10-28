import { destroy, destroyDark, primary, primaryDark } from '@/src/css';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function DepositWithdrawTabBar({ state: { index }, navigation: { navigate } }: BottomTabBarProps) {
  const isDeposit = !index;

  return (<View className="pt-20 flex-row justify-stretch">
    {/* Deposit */}
    <Pressable
      className="flex flex-row justify-between w-[50%] absolute top-0 left-0"
      style={{ zIndex: isDeposit ? 10 : 0 }}
      onPress={() => navigate("deposits")}
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

    {/* Withdraw */}
    <Pressable
      className="flex flex-row justify-end w-[50%] absolute top-0 right-0"
      style={{ zIndex: isDeposit ? 0 : 10 }}
      onPress={() => navigate("withdraws")}
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
  </View>
  );
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
