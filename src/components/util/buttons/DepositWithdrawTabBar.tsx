import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import DepositSide from './depositWithdrawTabs/DepositSide';
import WithdrawSide from './depositWithdrawTabs/WithdrawSide';

export default function DepositWithdrawTabBar({ state: { index }, navigation: { navigate }, mode }: BottomTabBarProps & { mode: "Preset" | "Action" }) {
  const isDeposit = !index;

  return (<View className="pt-20 flex-row justify-stretch">
    <DepositSide isDeposit={isDeposit} mode={mode} />
    <WithdrawSide isDeposit={isDeposit} mode={mode} />
  </View>
  );
}


