import NewPreset from '@/src/components/presets/NewPreset';
import BackArrow from '@/src/components/util/buttons/BackArrow';
import useKeyboard from '@/src/hooks/useKeyboard';
import React from 'react';

export default function Add() {


  const isKeyboardUp = useKeyboard();

  return (
    <>
      <BackArrow size={!isKeyboardUp ? 60 : 30} color='black' />
      <NewPreset isDeposit={true} />
    </>
  )
}