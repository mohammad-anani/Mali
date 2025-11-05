

// fromDate, toDate, currency 

import { getBalance } from "@/backend/data-access-layer/transactions/balance";

export async function getTotalUSDBalance(): Promise<number> {


  const balance = await getBalance({ isLBP: false });

  if (balance < 0) {
    return 0;
  }

  return balance;

}

export async function getTotalLBPBalance(): Promise<number> {


  const balance = await getBalance({ isLBP: true });

  if (balance < 0) {
    return 0;
  }

  return balance;

}