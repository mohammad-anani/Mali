import themeColor from '@/src/util/themeColor';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import ContentView from './ContentView';

export default function DepositWithdrawTabs({ children, isDeposit = false }: { children: ReactNode, isDeposit?: boolean }) {

  const color = themeColor(isDeposit);


  return (
    <View className=" flex-1">
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


