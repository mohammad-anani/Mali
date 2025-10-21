import { getAllDeposits, type Deposit } from '@/backend/business-layer/transactions/Deposit'

import TransactionRow from '@/src/components/transactions/TransactionRow'
import Button from '@/src/components/util/Button'
import getMonthYear from '@/src/util/getMonthYear'
import { numberToMoney } from '@/src/util/numberToMoney'
import React, { useEffect, useState } from 'react'
import { SectionList, Text, View } from 'react-native'




export default function Index() {


  const [data, setData] = useState<Deposit[] | null>([])

  useEffect(() => {


    async function fetch() {




      const fetchedData = await getAllDeposits();
      setData(fetchedData ?? null);
    }

    fetch();
  }, [])


  if (!data)
    return;

  const currentMonthYear = getMonthYear(new Date());

  let sectionedDeposits = data.reduce((acc, deposit) => {


    const monthYear = getMonthYear(deposit.date);
    const sectionName = monthYear.month + " " + monthYear.year;
    const sectionIndex = acc.findIndex((sec) => sec.title === sectionName)


    if (sectionIndex === -1)

      return [...acc, { title: sectionName, data: [deposit] }];

    acc[sectionIndex].data.push(deposit);

    return acc;


  }, [] as { title: string; data: Deposit[] }[])

  sectionedDeposits = sectionedDeposits.map((sd) => sd.title === currentMonthYear.month + " " + currentMonthYear.year ? { title: "Current Month", data: sd.data } : sd);

  return (
    <View className='flex-1 gap-3'>

      <Button pressableProps={{ className: `h-20 rounded-3xl bg-primary items-center justify-center ` }} textProps={{ className: "text-4xl text-secondary" }}>+ New Deposit</Button>
      <View className='flex-row justify-end gap-2'>
        <Button pressableProps={{ className: ` rounded-xl w-[120px] h-[40px] items-center justify-center border-[1px] border-solid  border-primary ` }} textProps={{ className: `text-xl text-primary ` }}>Clear Filter</Button>
        <Button pressableProps={{ className: ` rounded-xl w-[120px] h-[40px] items-center justify-center border-[1px] border-solid border-primary ` }} textProps={{ className: ` text-primary text-xl  ` }}>Filter</Button>
      </View>
      <SectionList

        sections={sectionedDeposits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionRow transaction={item} isWithdraw={false} />
        )}
        renderSectionHeader={({ section }) => (
          <View className='bg-secondary'>
            <Text className='text-3xl'>{section.title}</Text>
            <View className='h-[1px] w-full  bg-black'></View>
          </View>
        )}
        stickySectionHeadersEnabled={true}
        contentContainerClassName='gap-2'



        renderSectionFooter={({ section: { data } }) => {

          const totalLBP = data.reduce((acc, deposit) => {
            return deposit.isLBP ? acc + deposit.amount : acc;
          }, 0 as number)

          const totalUSD = data.reduce((acc, deposit) => {
            return !deposit.isLBP ? acc + deposit.amount : acc;
          }, 0 as number)


          return (<View className='flex-row justify-between px-5 mb-8 bg-primary rounded-full items-center'>


            <Text className='text-[26px] text-secondary '>Total:</Text>
            <View><Text className='text-[18px] text-secondary'>{numberToMoney(totalLBP) + " LBP"}</Text><Text className='text-[18px] text-secondary'>{numberToMoney(totalUSD) + " USD"}</Text></View>
          </View>)

        }}
      />
    </View>
  )
}
