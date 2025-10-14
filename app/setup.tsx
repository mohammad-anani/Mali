import steps from '@/src/components/setup/Steps';
import Button from '@/src/components/util/Button';
import Logo from '@/src/components/util/Logo';
import LogoName from '@/src/components/util/LogoName';
import { secondary2 } from '@/src/css';
import useKeyboard from '@/src/hooks/useKeyboard';
import { CircleArrowLeft } from "lucide-react-native";
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

export type initObject = {
  lbp_usdRate: number,
  lbp: number | null,
  usd: number | null
}

export default function Setup() {


  const [pageIndex, setPageIndex] = useState(0);
  const [object, setObject] = useState<initObject>({ lbp_usdRate: 90000, lbp: null, usd: null });

  const Steps = steps(object, setObject);


  function submit() {
    console.log(object);
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

  const isKeyboardUp = useKeyboard();

  return (
    <View className='flex flex-col items-center  h-full '>

      <View className=' self-start w-[58px] h-[58px]' >

        {
          pageIndex ?
            <Pressable onPress={() => decrementPageIndex()}>

              <CircleArrowLeft width={58} height={58} color={secondary2} />
            </Pressable>
            : null}
      </View>
      <View className={!isKeyboardUp ? 'gap-8 flex flex-col items-center' : 'gap-3 flex flex-row items-center'}>

        <Logo className={!isKeyboardUp ? 'h-[186px] w-[186px]' : 'h-[60px] w-[60px]'} />
        <LogoName className={!isKeyboardUp ? 'h-[120px] aspect-[2/1] ' : 'h-[40px] w-[100px] aspect-[2/1] '} />
      </View>
      <View className=' flex-1 justify-center items-start self-start '>
        {Steps[pageIndex]}
      </View>

      <Button pressableProps={{ className: " bg-primary w-[280px] h-[100px] rounded-[50px] justify-center", onPress: () => incrementPageIndex() }} textProps={{ className: "text-secondary text-[59px] text-center" }}>
        {!pageIndex ? "Start" : pageIndex === pageCount - 1 ? "Finish" : "Next"}
      </Button>

    </View>
  )
}
