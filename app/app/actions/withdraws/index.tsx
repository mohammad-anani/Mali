import Loading from '@/src/components/util/Loading';
import { router } from 'expo-router';
import React from 'react';

export default function Index() {
  router.replace("/app/actions/withdraws/list");


  return <Loading />
}

