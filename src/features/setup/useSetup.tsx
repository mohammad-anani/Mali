import { CheckDatabaseExists } from '@/backend/business-layer/general';
import { init } from '@/backend/business-layer/setup';
import steps from '@/src/features/setup/Steps';
import { DEFAULT_RATE } from '@/src/util/constants';
import { minimum_1k_MoneyFormatter } from '@/src/util/minimum_1k_MoneyFormatter';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';


export type initObject = {
  lbp_usdRate: number,
  lbp: number | null,
  usd: number | null,
  isError: boolean
}

export default function useSetup() {



  useEffect(
    () => {
      async function checkDB() {

        const dbExists = await CheckDatabaseExists();

        if (dbExists)
          router.replace("/");

      }

      checkDB();

    }
    , [])





  const [pageIndex, setPageIndex] = useState(0);
  const [object, setObject] = useState<initObject>({ lbp_usdRate: 90000, lbp: null, usd: null, isError: false });





  const Steps = steps(object, setObject);


  async function submit() {


    const finalUSDAmount = object.usd ?? 0
    const finalLBPAmount = minimum_1k_MoneyFormatter(object.lbp ?? 0);
    const finalRate = !object.lbp_usdRate ? DEFAULT_RATE : minimum_1k_MoneyFormatter(object.lbp_usdRate)




    if (await init(finalRate, finalLBPAmount, finalUSDAmount)) {

      // return Redirect({ href: '/' })
      router.replace('/');


    }
  }

  async function incrementPageIndex() {
    if (pageIndex < pageCount - 1)
      setPageIndex(p => p + 1)
    else
      await submit();
  }

  function decrementPageIndex() {
    if (pageIndex > 0)
      setPageIndex(p => p - 1)
  }

  const pageCount = Steps.length;




  return { pageIndex, pageCount, object, Steps, incrementPageIndex, decrementPageIndex };

}

