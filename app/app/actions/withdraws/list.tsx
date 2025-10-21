import { getAllWithdraws, type Withdraw } from '@/backend/business-layer/transactions/Withdraw'

import TransactionRow from '@/src/components/transactions/TransactionRow'
import Button from '@/src/components/util/Button'
import getMonthYear from '@/src/util/getMonthYear'
import { numberToMoney } from '@/src/util/numberToMoney'
import React, { useEffect, useState } from 'react'
import { SectionList, Text, View } from 'react-native'




export default function Index() {


  const [data, setData] = useState<Withdraw[] | null>([])

  useEffect(() => {


    async function fetch() {




      const fetchedData = await getAllWithdraws();
      setData(fetchedData ?? null);
    }

    fetch();
  }, [])


  if (!data)
    return;

  const currentMonthYear = getMonthYear(new Date());

  let sectionedWithdraws = data.reduce((acc, withdraw) => {


    const monthYear = getMonthYear(withdraw.date);
    const sectionName = monthYear.month + " " + monthYear.year;
    const sectionIndex = acc.findIndex((sec) => sec.title === sectionName)


    if (sectionIndex === -1)

      return [...acc, { title: sectionName, data: [withdraw] }];

    acc[sectionIndex].data.push(withdraw);

    return acc;


  }, [] as { title: string; data: Withdraw[] }[])

  sectionedWithdraws = sectionedWithdraws.map((sw) => sw.title === currentMonthYear.month + " " + currentMonthYear.year ? { title: "Current Month", data: sw.data } : sw);

  return (
    <View className='flex-1 gap-3'>

      <Button pressableProps={{ className: `h-20 rounded-3xl bg-destroy items-center justify-center ` }} textProps={{ className: "text-4xl text-secondary" }}>+ New Withdraw</Button>
      <View className='flex-row justify-end gap-2'>
        <Button pressableProps={{ className: ` rounded-xl w-[120px] h-[40px] items-center justify-center border-[1px] border-solid  border-destroy ` }} textProps={{ className: `text-xl text-destroy ` }}>Clear Filter</Button>
        <Button pressableProps={{ className: ` rounded-xl w-[120px] h-[40px] items-center justify-center border-[1px] border-solid border-destroy ` }} textProps={{ className: ` text-destroy text-xl  ` }}>Filter</Button>

      </View>
      <SectionList
        sections={sectionedWithdraws}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionRow transaction={item} isWithdraw={true} />
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

          const totalLBP = data.reduce((acc, withdraw) => {
            return withdraw.isLBP ? acc + withdraw.amount : acc;
          }, 0 as number)

          const totalUSD = data.reduce((acc, withdraw) => {
            return !withdraw.isLBP ? acc + withdraw.amount : acc;
          }, 0 as number)


          return (<View className='flex-row justify-between px-5 mb-8 bg-destroy rounded-full items-center'>


            <Text className='text-[26px] text-secondary '>Total:</Text>
            <View><Text className='text-[18px] text-secondary'>{numberToMoney(totalLBP) + " LBP"}</Text><Text className='text-[18px] text-secondary'>{numberToMoney(totalUSD) + " USD"}</Text></View>
          </View>)

        }}
      />
    </View>
  )
}



