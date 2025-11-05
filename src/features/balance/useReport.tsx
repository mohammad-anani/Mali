import { getSetting } from '@/backend/business-layer/Settings';
import { getTotalDepositsLBP, getTotalDepositsUSD } from '@/backend/business-layer/transactions/deposit';
import { getOldestTransactionDate } from '@/backend/business-layer/transactions/report';
import { getTotalWithdrawsLBP, getTotalWithdrawssUSD } from '@/backend/business-layer/transactions/withdraw';
import { minimum_1k_MoneyFormatter } from '@/src/util/minimum_1k_MoneyFormatter';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { queryNames } from './Report';

export default function useReport() {
  const [isOpen, setIsOpen] = useState(false);


  const [{ data: oldestDate, isError: dateError, isLoading: dateLoading },

    { data: rate, isError: rateError, isLoading: rateLoading }
  ] = useQueries({
    queries: [{ queryKey: ['oldestDate'], queryFn: getOldestTransactionDate },
    {
      queryKey: ['currencyRate'], queryFn: async () => {
        return await getSetting("LBP_Per_USD_Rate")
      }
    }]
  });

  const allMonths = getMonthsFromDateToNow(oldestDate);

  const dropdownData = allMonths.map((m) => ({
    label: new Date(m.start).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
    }),
    value: m,
  }));

  const [dates, setDates] = useState(
    allMonths.length ? [allMonths[0].start, allMonths[0].end] : getCurrentMonthStartEnd()
  );


  const results = useQueries({
    queries: [
      {
        queryKey: [queryNames[0], dates[0], dates[1]],
        queryFn: () => getTotalDepositsLBP(dates[0], dates[1]),
        enabled: !!(dates[0] && dates[1] && oldestDate),
      },
      {
        queryKey: [queryNames[1], dates[0], dates[1]],
        queryFn: () => getTotalWithdrawsLBP(dates[0], dates[1]),
        enabled: !!(dates[0] && dates[1] && oldestDate),
      },
      {
        queryKey: [queryNames[2], dates[0], dates[1]],
        queryFn: () => getTotalDepositsUSD(dates[0], dates[1]),
        enabled: !!(dates[0] && dates[1] && oldestDate),
      },
      {
        queryKey: [queryNames[3], dates[0], dates[1]],
        queryFn: () => getTotalWithdrawssUSD(dates[0], dates[1]),
        enabled: !!(dates[0] && dates[1] && oldestDate),
      },
    ],
  });

  const [
    { data: totalDepositsLBP, isLoading: depLBPLoading, isError: depLBPError },
    { data: totalWithdrawsLBP, isLoading: witLBPLoading, isError: witLBPError },
    { data: totalDepositsUSD, isLoading: depUSDLoading, isError: depUSDError },
    { data: totalWithdrawsUSD, isLoading: witUSDLoading, isError: witUSDError },
  ] = results;

  const loading = depLBPLoading || rateLoading || witLBPLoading || depUSDLoading || witUSDLoading || dateLoading;
  const nullValues = totalDepositsLBP == null || totalWithdrawsLBP == null || totalWithdrawsUSD == null || totalDepositsUSD == null || rate == null
  const error = depLBPError || depUSDError || witLBPError || witUSDError || dateError || rateError || nullValues;



  const netUSD = !nullValues ? (totalDepositsUSD - totalWithdrawsUSD) : 0;
  const netLBP = !nullValues ? (totalDepositsLBP - totalWithdrawsLBP) : 0;
  const finalUSD = !nullValues ? (netUSD + minimum_1k_MoneyFormatter(netLBP / +rate)) : 0;
  const finalLBP = !nullValues ? (netLBP + netUSD * +rate) : 0;


  return { totalDepositsLBP, totalWithdrawsLBP, totalDepositsUSD, totalWithdrawsUSD, netLBP, netUSD, finalLBP, finalUSD, isOpen, setIsOpen, dropdownData, setDates, error, loading };

}

function getMonthsFromDateToNow(oldestDate: string | null | undefined) {
  return (() => {
    if (!oldestDate) return []

    const start = new Date(oldestDate)
    const end = new Date()
    const months = []
    let current = new Date(start.getFullYear(), start.getMonth(), 1)

    while (current <= end) {
      const year = current.getFullYear()
      const month = current.getMonth() + 1
      const startStr = `${year}-${String(month).padStart(2, '0')}-01`
      const lastDay = new Date(year, month, 0).getDate()
      const endStr = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`
      months.push({ start: startStr, end: endStr })
      current.setMonth(current.getMonth() + 1)
    }

    return months.reverse()
  })()
}


function getCurrentMonthStartEnd() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // months are 0-based

  const currentMonthStart = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const currentMonthEnd = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  return [currentMonthStart, currentMonthEnd];
}