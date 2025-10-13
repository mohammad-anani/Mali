import steps from '@/components/setup/Steps';
import Button from '@/components/util/Button';
import Logo from '@/components/util/Logo';
import LogoName from '@/components/util/LogoName';
import { secondary2 } from '@/css';
import { CircleArrowLeft } from "lucide-react-native";
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

export type initObject = {
  name: string,
  lbp_usdRate: number,
  lbp: number,
  usd: number
}

export default function Setup() {


  const [pageIndex, setPageIndex] = useState(0);
  const [object, setObject] = useState<initObject>({ name: "", lbp_usdRate: 90000, lbp: 0, usd: 0 });

  const Steps = steps(object, setObject);


  function submit() {
    console.log("submit");
  }

  function incrementPageIndex() {
    if (pageIndex < pageCount - 1)
      setPageIndex(p => ++p)
    else
      submit();
  }

  function decrementPageIndex() {
    if (pageIndex > 0)
      setPageIndex(p => --p)
  }

  const pageCount = Steps.length;

  return (
    <View className='flex flex-col items-center pb-10 h-full'>
      <View className=' self-start w-[58px] h-[58px]' >

        {
          pageIndex ?
            <Pressable onPress={() => decrementPageIndex()}>

              <CircleArrowLeft width={58} height={58} color={secondary2} />
            </Pressable>
            : null}
      </View>
      <View className='flex flex-col items-center gap-8'>

        <Logo className='h-[186px] w-[186px]' />
        <LogoName className='h-[120px] aspect-[2/1] ' />
      </View>
      <View className='flex-1 justify-center items-center w-full'>
        {Steps[pageIndex]}
      </View>

      <Button pressableProps={{ className: " bg-primary w-[280px] h-[100px] rounded-[50px] justify-center", onPress: () => incrementPageIndex() }} textProps={{ className: "text-secondary text-[59px] text-center" }}>
        {!pageIndex ? "Start" : pageIndex === pageCount - 1 ? "Finish" : "Next"}
      </Button>

    </View>
  )
}
