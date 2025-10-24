import { destroy, destroyDark, primary, primaryDark } from '@/src/css';
import themeColor from '@/src/util/themeColor';
import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ContentView from './ContentView';

export default function DepositWithdrawTabs({ children, isWithdraw, setIsWithdraw }: { children: ReactNode, isWithdraw: boolean, setIsWithdraw: (isWithdraw: boolean) => void }) {

  const color = themeColor(isWithdraw);

  return (
    <View className="pt-10 flex-1">
      <View className="pt-20 flex-row justify-stretch">
        {/* Deposit */}
        <Pressable
          className="flex flex-row justify-between w-[50%] absolute top-0 left-0"
          style={{ zIndex: !isWithdraw ? 10 : 0 }}
          onPress={() => setIsWithdraw(false)}
        >
          <View
            className={`h-20 w-[80%] justify-center ${!isWithdraw ? 'bg-primary' : 'bg-primaryDark'
              }`}
          >
            <Text className="text-secondary ml-5 text-3xl">Deposits</Text>
          </View>
          <View
            style={[
              triangleLeft.triangle,
              { borderTopColor: !isWithdraw ? primary : primaryDark }, // uses primaryDark when inactive
            ]}
          />
        </Pressable>

        {/* Withdraw */}
        <Pressable
          className="flex flex-row justify-end w-[50%] absolute top-0 right-0"
          style={{ zIndex: isWithdraw ? 10 : 0 }}
          onPress={() => setIsWithdraw(true)}
        >
          <View
            style={[
              triangleRight.triangle,
              { borderTopColor: isWithdraw ? destroy : destroyDark }, // uses destroyDark when inactive
            ]}
          />
          <View
            className={`h-20 w-[80%] justify-center ${isWithdraw ? 'bg-destroy' : 'bg-destroyDark bg'
              }`}
          >
            <Text className="text-secondary text-right mr-5 text-3xl">
              Withdraws
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Content */}
      <View
        className={`p-5 flex-1 ${color}`}
      >
        <ContentView className="flex-1" >
          {children}
        </ContentView>
      </View>
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
