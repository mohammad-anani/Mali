import React from "react";
import { View } from "react-native";
import NewPresetButton from "./presetList/NewPresetButton";
import { TransactionListItems } from "./presetList/PresetListItems";

type Mode = "Deposit" | "Withdraw";



export default function PresetList({
  mode,
}: { mode: Mode }) {


  const isDeposit = mode === "Deposit";
  const color = isDeposit ? "primary" : "destroy";

  return (
    <View className="flex-1 gap-3">
      <NewPresetButton isDeposit={isDeposit} />
      <TransactionListItems isDeposit={isDeposit} color={color} />
    </View>
  );
}



