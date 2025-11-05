import ContentView from '@/src/components/util/containers/ContentView'
import Error from '@/src/components/util/state/Error'
import Loading from '@/src/components/util/state/Loading'
import Label from '@/src/components/util/ui/Label'
import Title from '@/src/components/util/ui/Title'
import { primary } from '@/src/css'
import { moneySign, numberToMoney } from '@/src/util/numberToMoney'
import { Info } from 'lucide-react-native'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import GuideModal from './GuideModal'
import useReport from './useReport'

export const queryNames = [
  'totalDepositsLBP',
  'totalWithdrawsLBP',
  'totalDepositsUSD',
  'totalWithdrawsUSD',
];

export default function Report() {

  const { totalDepositsLBP, totalWithdrawsLBP, totalDepositsUSD, totalWithdrawsUSD, netLBP, netUSD, finalLBP, finalUSD, isOpen, setIsOpen, dropdownData,
    setDates, error, loading
  } = useReport();
  const lbp = 'LBP', usd = 'USD';

  return (
    <>
      <ContentView className='gap-2'>
        <View className='flex-row justify-between'>
          <Title>Report:</Title>
          <Pressable onPress={() => setIsOpen(true)}>
            <Info width={40} height={40} />
          </Pressable>
        </View>

        <View className='flex-row items-center gap-2'>
          <Label>Month:</Label>
          <View className='bg-white rounded-[30px] flex-1 justify-center px-5 h-[45px]'>
            <Dropdown
              data={dropdownData}
              labelField="label"
              valueField="value"
              activeColor={primary}
              placeholder="Select Month"
              value={dropdownData[0]}
              onChange={(item: { label: string; value: { start: string; end: string } }) => {
                setDates([item.value.start, item.value.end]);
              }}
              placeholderStyle={styles.placeholder}
              selectedTextStyle={styles.selectedText}
              itemTextStyle={styles.itemTextStyle}
              containerStyle={styles.dropdownContainer}
              iconStyle={styles.icon}
            />
          </View>
        </View>

        {loading ? <Loading size='small' /> : error ? <Error message={"Couldn't retrieve data."} /> :
          <>
            <View>
              <Label>Deposits:</Label>
              <View className='items-center'>
                <Text className='text-primary text-3xl'>{`${numberToMoney(totalDepositsLBP ?? 0)} ${lbp}`}</Text>
                <Text className='text-[24px]'>and</Text>
                <Text className='text-primary text-3xl'>{`${numberToMoney(totalDepositsUSD ?? 0)} ${usd}`}</Text>
              </View>
            </View>

            <View>
              <Label>Withdraws:</Label>
              <View className='items-center'>
                <Text className='text-destroy text-3xl'>{`${numberToMoney(totalWithdrawsLBP ?? 0)} ${lbp}`}</Text>
                <Text className='text-[24px]'>and</Text>
                <Text className='text-destroy text-3xl'>{`${numberToMoney(totalWithdrawsUSD ?? 0)} ${usd}`}</Text>
              </View>
            </View>

            <View >
              <Label> Net Balance: </Label>
              <View className='items-center'>
                <Text className={`${netLBP < 0 ? "text-destroy" : netLBP > 0 ? "text-primary" : ""} text-3xl`}>{`${moneySign(netLBP)} ${lbp}`}</Text>
                <Text className='text-[24px]'>and</Text>
                <Text className={`${netUSD < 0 ? "text-destroy" : netUSD > 0 ? "text-primary" : ""} text-3xl`}>{`${moneySign(netUSD)} ${usd}`}</Text>
              </View>

            </View>
            <View className='w-full border-[1px]'>
            </View>
            <View >
              <Label> Final Net: </Label>
              <View className='items-center'>
                <Text className={`${finalLBP < 0 ? "text-destroy" : finalLBP > 0 ? "text-primary" : ""} text-3xl`}>{`${moneySign(finalLBP)} ${lbp}`}</Text>
                <Text className='text-[24px]'>or</Text>

                <Text className={`${finalUSD < 0 ? "text-destroy" : finalUSD > 0 ? "text-primary" : ""} text-3xl`}>{`${moneySign(finalUSD)} ${usd}`}</Text>
              </View>
            </View>
          </>
        }


      </ContentView>

      <GuideModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

const styles = StyleSheet.create({
  placeholder: { fontSize: 20, color: '#999' },
  selectedText: { fontSize: 20 },
  itemTextStyle: { fontSize: 16 },
  dropdownContainer: { borderRadius: 8 },
  icon: { width: 30 },
});


