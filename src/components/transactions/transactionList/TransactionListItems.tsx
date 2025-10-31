import { Transaction } from "@/backend/business-layer/transactions/Transaction";
import React from "react";
import { SectionList } from "react-native";
import TransactionRow from "../TransactionRow";
import { TransactionListFooter } from "./TransactionListFooter";
import { TransactionListHeader } from "./TransactionListHeader";

import { BUSINESS_FN } from '@/src/dicts/businessFn';
import { QUERY_KEYS } from '@/src/dicts/queryKeys';
import getMode from "@/src/util/getMode";
import getMonthYear from "@/src/util/getMonthYear";
import themeColor from "@/src/util/themeColor";
import { useQuery } from "@tanstack/react-query";
import EmptyList from "../../util/state/EmptyList";
import Error from "../../util/state/Error";
import Loading from "../../util/state/Loading";
import NewTransactionButton from "./NewTransactionButton";



function dataToSections(data: Transaction[]) {


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

  return sections;
}

export function TransactionListItems({ isDeposit }: { isDeposit: boolean }) {

  const color = themeColor(isDeposit);
  const listFn = BUSINESS_FN.transactions.list.of(isDeposit);
  const keys = QUERY_KEYS.transactions.of(isDeposit);
  const { data, isLoading, isError } = useQuery({ queryKey: keys.list, queryFn: listFn });

  const mode = getMode(isDeposit)

  if (isLoading)
    return <Loading size="medium" />

  if (isError || !data)
    return <Error message={`${mode}s not availbale. Please try again later.`} />


  const sections = dataToSections(data);


  return <SectionList
    sections={sections}

    ListEmptyComponent={() => <EmptyList entity={`${mode} Presets`}>
      <NewTransactionButton isDeposit={isDeposit} />
    </EmptyList>}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <TransactionRow transaction={item} isDeposit={isDeposit} />
    )}
    renderSectionHeader={({ section }) => <TransactionListHeader section={section} />}
    stickySectionHeadersEnabled
    contentContainerClassName="gap-2"
    renderSectionFooter={({ section }) => <TransactionListFooter section={section} isDeposit={isDeposit} />} />;
}
