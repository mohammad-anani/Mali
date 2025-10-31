import React from "react";
import { FlatList } from "react-native";


import { BUSINESS_FN } from '@/src/dicts/businessFn';
import { QUERY_KEYS } from '@/src/dicts/queryKeys';
import getMode from "@/src/util/getMode";
import { useQuery } from "@tanstack/react-query";
import EmptyList from "../../util/state/EmptyList";
import Error from "../../util/state/Error";
import Loading from "../../util/state/Loading";
import PresetRow from "../PresetRow";
import NewPresetButton from "./NewPresetButton";


export function PresetListItems({ isDeposit }: { isDeposit: boolean }) {


  const listFn = BUSINESS_FN.presets.list.of(isDeposit);
  const keys = QUERY_KEYS.presets.of(isDeposit);
  const { data, isLoading, isError } = useQuery({ queryKey: keys.list, queryFn: listFn });

  const mode = getMode(isDeposit)

  if (isLoading)
    return <Loading size="medium" />

  if (isError || !data)
    return <Error message={`${mode}s not availbale. Please try again later.`} />


  return <FlatList

    data={data}
    keyExtractor={(item) => item.id.toString()}
    ListEmptyComponent={() => <EmptyList entity={`${mode} Presets`}>
      <NewPresetButton isDeposit={isDeposit} />
    </EmptyList>}
    renderItem={({ item }) => (
      <PresetRow preset={item} isDeposit={isDeposit} />

    )}

    contentContainerClassName="gap-2"
  />
}
