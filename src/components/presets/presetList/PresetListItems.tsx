import React from "react";
import { FlatList } from "react-native";


import { getAllDepositPresets } from "@/backend/business-layer/presets/deposits";
import { getAllWithdrawPresets } from "@/backend/business-layer/presets/withdraws";
import { useQuery } from "@tanstack/react-query";
import EmptyList from "../../util/EmptyList";
import Error from "../../util/Error";
import Loading from "../../util/Loading";
import PresetRow from "../PresetRow";
import NewPresetButton from "./NewPresetButton";


export function TransactionListItems({ color, isDeposit }: { isDeposit: boolean, color: string }) {


  const { data, isLoading, isError } = useQuery({ queryKey: [isDeposit ? "getDepositPresets" : "getWithdrawPresets"], queryFn: isDeposit ? getAllDepositPresets : getAllWithdrawPresets });



  if (isLoading)
    return <Loading size="medium" />

  if (isError || !data)
    return <Error message={`${isDeposit ? "Deposit" : "Withdraw"}s not availbale. Please try again later.`} />


  return <FlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}
    ListEmptyComponent={() => <EmptyList entity={`${isDeposit ? "Deposit" : "Withdraw"} Presets`}>
      <NewPresetButton isDeposit={isDeposit} />
    </EmptyList>}

    renderItem={({ item }) => (
      <PresetRow preset={item} isWithdraw={!isDeposit} />

    )}

    contentContainerClassName="gap-2"
  />
}
