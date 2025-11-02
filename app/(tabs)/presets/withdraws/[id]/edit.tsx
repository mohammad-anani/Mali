import AddUpdatePreset from '@/src/components/presets/AddUpdatePreset';
import Error from '@/src/components/util/state/Error';
import React from 'react';
import { useWithdrawPresetDetails } from './_layout';


export default function Edit() {

  const preset = useWithdrawPresetDetails();

  if (!preset) {
    return <Error message={`Withdraw Preset retreiving failed. Please try again later`} />
  }

  return <AddUpdatePreset isDeposit={false} preset={preset} />
}