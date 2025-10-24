import React from "react";
import { View } from "react-native";
import NewTransactionButton from "./transactionList/NewTransactionButton";
import { TransactionListItems } from "./transactionList/TransactionListItems";

type Mode = "Deposit" | "Withdraw";



export default function TransactionList({
  mode,
}: { mode: Mode }) {


  const isDeposit = mode === "Deposit";



  const color = isDeposit ? "primary" : "destroy";

  return (
    <View className="flex-1 gap-3">
      <NewTransactionButton isDeposit={isDeposit} />

      <TransactionListItems isDeposit={isDeposit} color={color} />
    </View>
  );
}



