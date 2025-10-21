import Button from '@/src/components/util/Button';
import Logo from '@/src/components/util/Logo';
import LogoName from '@/src/components/util/LogoName';
import { secondary2 } from '@/src/css';
import useSetup from '@/src/features/setup/useSetup';
import { CircleArrowLeft } from "lucide-react-native";
import React from 'react';
import { Pressable, View } from 'react-native';



export default function Setup() {


  const { pageIndex, pageCount, object, Steps, incrementPageIndex, decrementPageIndex, isKeyboardUp } = useSetup();


  return (
    <View className='flex flex-col items-center  h-full pb-10 pt-2 px-5'>

      <View className=' self-start w-[58px] h-[58px]' >

        {
          pageIndex ?
            <Pressable onPress={() => decrementPageIndex}>

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

      <Button pressableProps={{ className: " bg-primary w-[280px] h-[100px] rounded-[50px] justify-center ", onPress: () => incrementPageIndex, disabled: object.isError }} textProps={{ className: "text-secondary text-[59px] text-center" }}>
        {!pageIndex ? "Start" : pageIndex === pageCount - 1 ? "Finish" : "Next"}
      </Button>

    </View>
  )
}
