import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import DepositWithdrawTabBar from '../../../src/components/util/buttons/DepositWithdrawTabBar';



export default function Layout() {

  return (
    <View className='flex-1 bg-background pt-10'>

      <Tabs
        initialRouteName="deposits"
        screenOptions={{
          tabBarPosition: "top",
          headerShown: false,
          sceneStyle: { backgroundColor: '#3E3E3E' },
          animation: 'none',

        }}
        tabBar={(props) => <DepositWithdrawTabBar {...props} />}
      />
    </View>
  );
}
