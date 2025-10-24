import { Transaction } from "@/backend/business-layer/transactions/Transaction";
import React from "react";
import { SectionList } from "react-native";
import TransactionRow from "../TransactionRow";
import { TransactionListFooter } from "./TransactionListFooter";
import { TransactionListHeader } from "./TransactionListHeader";

import { getAllDeposits } from "@/backend/business-layer/transactions/Deposit";
import { getAllWithdraws } from "@/backend/business-layer/transactions/Withdraw";
import getMonthYear from "@/src/util/getMonthYear";
import { useQuery } from "@tanstack/react-query";
import EmptyList from "../../util/EmptyList";
import Error from "../../util/Error";
import Loading from "../../util/Loading";
import NewTransactionButton from "./NewTransactionButton";

export function TransactionListItems({ color, isDeposit }: { isDeposit: boolean, color: string }) {


  const { data, isLoading, isError } = useQuery({ queryKey: [isDeposit ? "getDeposits" : "getWithdraws"], queryFn: isDeposit ? getAllDeposits : getAllWithdraws });



  if (isLoading)
    return <Loading size="medium" />

  if (isError || !data)
    return <Error message={`${isDeposit ? "Deposit" : "Withdraw"}s not availbale. Please try again later.`} />


  const currentMonthYear = getMonthYear(new Date());

  let sections = data.reduce((acc, transaction) => {
    const monthYear = getMonthYear(transaction.date);
    const sectionName = `${monthYear.month} ${monthYear.year}`;
    const sectionIndex = acc.findIndex((sec) => sec.title === sectionName);

    if (sectionIndex === -1) return [...acc, { title: sectionName, data: [transaction] }];

    acc[sectionIndex].data.push(transaction);
    return acc;
  }, [] as { title: string; data: Transaction[] }[]);

  sections = sections.map((s) =>
    s.title === `${currentMonthYear.month} ${currentMonthYear.year}`
      ? { title: "Current Month", data: s.data }
      : s
  );

  return <SectionList
    sections={sections}

    ListEmptyComponent={() => <EmptyList entity={`${isDeposit ? "Deposit" : "Withdraw"} Presets`}>
      <NewTransactionButton isDeposit={isDeposit} />
    </EmptyList>}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <TransactionRow transaction={item} isWithdraw={!isDeposit} />
    )}
    renderSectionHeader={({ section }) => <TransactionListHeader section={section} />}
    stickySectionHeadersEnabled
    contentContainerClassName="gap-2"
    renderSectionFooter={({ section }) => <TransactionListFooter section={section} color={color} />} />;
}
