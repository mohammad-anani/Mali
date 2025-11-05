import { getOldestTransactionDateData } from "@/backend/data-access-layer/transactions/transactions";

export async function getOldestTransactionDate() {


  return await getOldestTransactionDateData();
}