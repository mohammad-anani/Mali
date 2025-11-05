import BackArrow from '@/src/components/util/buttons/BackArrow';
import Button from '@/src/components/util/buttons/Button';
import { secondary2 } from '@/src/css';
import LogoDisplay from '@/src/features/setup/LogoDisplay';
import useSetup from '@/src/features/setup/useSetup';
import React from 'react';
import { View } from 'react-native';



export default function Setup() {


  const { pageIndex, pageCount, object, Steps, incrementPageIndex, decrementPageIndex } = useSetup();


  return (
    <View className='flex flex-col items-center  h-full pb-10 pt-2 px-5'>
      <View className=' self-start w-[58px] h-[58px]' >
        {
          pageIndex ?
            <BackArrow size={58} color={secondary2} onPress={decrementPageIndex} />
            : null}
      </View>
      <LogoDisplay />
      <View className=' flex-1 justify-center items-start self-start '>
        {Steps[pageIndex]}
      </View>

      <Button pressableProps={{ className: " bg-primary w-[280px] h-[100px] rounded-[50px] justify-center ", onPress: incrementPageIndex, disabled: object.isError }} textProps={{ className: "text-secondary text-[59px] text-center" }}>
        {!pageIndex ? "Start" : pageIndex === pageCount - 1 ? "Finish" : "Next"}
      </Button>
    </View>
  )
}
