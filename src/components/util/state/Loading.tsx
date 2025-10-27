import { primary } from '@/src/css'
import { ActivityIndicator, View } from 'react-native'
import Logo from '../ui/Logo'
import LogoName from '../ui/LogoName'

export default function Loading({ size = "large" }: { size?: "large" | "medium" | "small" }) {




  switch (size) {
    case "large":
      return (<View className="flex flex-col  items-center justify-center  h-full gap-10">
        <View className='gap-8 flex flex-col items-center'>

          <Logo className='h-[100px] w-[100px]' />
          <LogoName className='h-[80px] aspect-[2/1] ' />
        </View>
        <ActivityIndicator size={100} color={primary} />
      </View>)

    case "small":
      return (<View className="flex flex-row justify-center items-center   ">

        <ActivityIndicator size={60} color={primary} />
      </View>)

    //on need
    case "medium":
      return (<View className="flex flex-col  items-center justify-center flex-1 gap-10">
        <LogoName className='h-[60px] aspect-[2/1] ' />

        <ActivityIndicator size={80} color={primary} />
      </View>)
  }
}