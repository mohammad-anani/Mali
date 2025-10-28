import React from "react";
import { View } from "react-native";
import NewTransactionButton from "./transactionList/NewTransactionButton";
import { TransactionListItems } from "./transactionList/TransactionListItems";




export default function TransactionList({
  isDeposit = false
}: { isDeposit?: boolean }) {



  return (
    <View className="flex-1 gap-3">
      <NewTransactionButton isDeposit={isDeposit} />
      <TransactionListItems isDeposit={isDeposit} />
    </View>
  );
}



