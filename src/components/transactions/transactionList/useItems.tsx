import { Transaction } from '@/backend/business-layer/transactions/Transaction';
import BUSINESS_FN from '@/src/dicts/businessFn';
import QUERY_KEYS from '@/src/dicts/queryKeys';
import getMonthYear from '@/src/util/getMonthYear';
import { useQuery } from '@tanstack/react-query';

export default function useItems(isDeposit: boolean) {



  const listFn = BUSINESS_FN.transactions.list.of(isDeposit);
  const keys = QUERY_KEYS.transactions.of(isDeposit);
  const { data, isLoading, isError } = useQuery({ queryKey: keys.list, queryFn: listFn });



  if (!data) {
    return { sections: null, isLoading, isError: true };

  }

  const currentMonthYear = getMonthYear(new Date());

  let sections = (data as Transaction[]).reduce((acc, transaction) => {
    const monthYear = getMonthYear(transaction.date);
    const sectionName = `${monthYear.month} ${monthYear.year}`;
    const sectionIndex = acc.findIndex((sec) => sec.title === sectionName);

    if (sectionIndex === -1) return [...acc, { title: sectionName, data: [transaction] }];

    acc[sectionIndex].data.push(transaction);
    return acc;
  }, [] as { title: string; data: Transaction[] }[]);

  sections = sections.map((s) =>
    s.title === `${currentMonthYear.month} ${currentMonthYear.year}`
      ? { title: "Current Month", data: s.data }
      : s
  );



  return { sections, isLoading, isError };

}