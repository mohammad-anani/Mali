import { Transaction } from "@/backend/business-layer/transactions/Transaction";
import { numberToMoney } from "@/src/util/numberToMoney";
import themeColor from "@/src/util/themeColor";
import React from "react";
import { Text, View } from "react-native";

export function TransactionListFooter({ section, isDeposit = false }: { section: { title: string; data: Transaction[]; }, isDeposit?: boolean }) {

  const { data } = section;

  const totalLBP = data.reduce(
    (acc, t) => (t.isLBP ? acc + t.amount : acc),
    0
  );
  const totalUSD = data.reduce(
    (acc, t) => (!t.isLBP ? acc + t.amount : acc),
    0
  );


  const color = themeColor(isDeposit);

  return (
    <View
      className={`flex-row justify-between px-5 mb-8  rounded-full  ${color} items-center`}
    >
      <Text className="text-[26px] text-secondary">Total:</Text>
      <View>
        <Text className="text-[18px] text-secondary">
          {numberToMoney(totalLBP)} LBP
        </Text>
        <Text className="text-[18px] text-secondary">
          {numberToMoney(totalUSD)} USD
        </Text>
      </View>
    </View>
  );
}
