import PresetDetails from '@/src/components/presets/PresetDetails';
import Error from '@/src/components/util/state/Error';
import React from 'react';
import { useWithdrawPresetDetails } from './_layout';

export default function WithdrawDetails() {

  const preset = useWithdrawPresetDetails();

  if (!preset) {
    return <Error message={`Withdraw retreiving failed. Please try again later`} />

  }
  return <PresetDetails isDeposit preset={preset} />


}