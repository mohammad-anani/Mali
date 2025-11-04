import BUSINESS_FN from '@/src/dicts/businessFn';
import QUERY_KEYS from '@/src/dicts/queryKeys';
import { numberToMoney } from '@/src/util/numberToMoney';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { TransactionForm } from './useNewTransaction';

export default function useDropDownInput(object: TransactionForm, isDeposit: boolean, setObject: React.Dispatch<React.SetStateAction<TransactionForm>>) {

  const { data: presets } = useQuery({ queryKey: QUERY_KEYS.presets.of(isDeposit).list, queryFn: BUSINESS_FN.presets.list.of(isDeposit) });


  let presetsList = presets ? presets.map(p => ({ label: (p.title + " " + numberToMoney(p.amount) + " ") + (p.isLBP ? "LBP" : "USD"), value: p.id })) : [];

  presetsList = [{ label: "None", value: 0 }, ...presetsList]
  console.log(presetsList);

  useEffect(() => {

    if (!object.presetID) {
      setObject((o) => ({ ...o, isLBP: true, title: "", amount: null }))

    }
    else {


      const preset = presets?.find(p => p.id === object.presetID);

      if (!preset) {
        setObject((o) => ({ ...o, isLBP: true, title: "", amount: null }))
      }
      else {


        setObject((o) => ({ ...o, isLBP: preset?.isLBP, title: preset?.title, amount: preset?.amount }))
      }
    }

  }, [object.presetID])


  return presetsList

}