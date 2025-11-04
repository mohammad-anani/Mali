import React from "react";
import { SectionList } from "react-native";
import TransactionRow from "../TransactionRow";
import { TransactionListFooter } from "./TransactionListFooter";
import { TransactionListHeader } from "./TransactionListHeader";

import getMode from "@/src/util/getMode";
import EmptyList from "../../util/state/EmptyList";
import Error from "../../util/state/Error";
import Loading from "../../util/state/Loading";
import NewTransactionButton from "./NewTransactionButton";
import useItems from "./useItems";



export function TransactionListItems({ isDeposit }: { isDeposit: boolean }) {


  const { sections, isLoading, isError } = useItems(isDeposit);
  const mode = getMode(isDeposit)

  if (isLoading)
    return <Loading size="medium" />

  if (isError || !sections)
    return <Error message={`${mode}s not availbale. Please try again later.`} />

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
