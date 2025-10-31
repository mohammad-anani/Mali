import PresetDetails from '@/src/components/presets/PresetDetails';
import Error from '@/src/components/util/state/Error';
import React from 'react';
import { useDepositPresetDetails } from './_layout';

export default function DepositDetails() {

  const preset = useDepositPresetDetails();

  if (!preset) {
    return <>

      <Error message={`Deposit retreiving failed. Please try again later`} />
    </>
  }


  return <PresetDetails isDeposit preset={preset} />


}