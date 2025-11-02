import AddUpdatePreset from '@/src/components/presets/AddUpdatePreset';
import Error from '@/src/components/util/state/Error';
import React from 'react';
import { useDepositPresetDetails } from './_layout';


export default function Edit() {



  const preset = useDepositPresetDetails();

  if (!preset) {
    return <Error message={`Deposit retreiving failed. Please try again later`} />

  }


  return <AddUpdatePreset isDeposit preset={preset} />
}