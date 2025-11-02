import NewTransaction from '@/src/components/transactions/NewTransaction'
import React from 'react'

export default function Add() {
  return (
    <NewTransaction isDeposit={false} />
  )
}