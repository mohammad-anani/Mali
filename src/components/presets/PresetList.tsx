import React from "react";
import { View } from "react-native";
import NewPresetButton from "./presetList/NewPresetButton";
import { PresetListItems } from "./presetList/PresetListItems";




export default function PresetList({
  isDeposit = false
}: { isDeposit?: boolean }) {



  return (
    <View className="flex-1 gap-3">
      <NewPresetButton isDeposit={isDeposit} />
      <PresetListItems isDeposit={isDeposit} />
    </View>
  );
}



