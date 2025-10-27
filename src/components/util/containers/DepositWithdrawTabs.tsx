import themeColor from '@/src/util/themeColor';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import ContentView from './ContentView';

export default function DepositWithdrawTabs({ children, isWithdraw, setIsWithdraw }: { children: ReactNode, isWithdraw: boolean, setIsWithdraw: (isWithdraw: boolean) => void }) {

  const color = themeColor(isWithdraw);


  return (



    <View className=" flex-1">


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
