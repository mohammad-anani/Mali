

// fromDate, toDate, currency 

import { getBalance } from "@/backend/data-access-layer/transactions/balance";

export async function getTotalUSDBalance() {


  const balance = await getBalance({ isLBP: 0 });

  if (balance < 0) {
    return 0;
  }

  return balance;

}

export async function getTotalLBPBalance() {


  const balance = await getBalance({ isLBP: 1 });

  if (balance < 0) {
    return 0;
  }

  return balance;

}