import { Transaction } from "@/backend/business-layer/transactions/Transaction";
import React from "react";
import { Text, View } from "react-native";

export function TransactionListHeader({ section }: { section: { title: string; data: Transaction[]; }; }) {
  return (
    <View className="bg-secondary">
      <Text className="text-3xl">{section.title}</Text>
      <View className="h-[1px] w-full bg-black" />
    </View>
  );
}
