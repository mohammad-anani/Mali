import { z } from "zod";

import { createTransactionData, deleteTransactionData, findTransactionByIDData, getAllTransactionsData } from "@/backend/data-access-layer/transactions/transactions";
import { Transaction, TransactionSchema, UnknowTransaction } from "./Transaction";


export async function createWithdraw(withdraw: Transaction): Promise<number> {

  const parseResult = TransactionSchema.safeParse(withdraw);

  if (parseResult.success)
    return await createTransactionData({ ...withdraw, isDeposit: false });

  return 0;

}

export async function deleteWithdraw(id: number): Promise<boolean> {
  return await deleteTransactionData(id);
}

export async function findWithdrawByID(id: number): Promise<Transaction | null> {

  const transaction = await findTransactionByIDData(id) as UnknowTransaction | null;

  if (!transaction || !transaction.id) {
    return null;
  }

  if (transaction.isDeposit) {
    console.log("transaction is not a withdraw.Returning null");
    return null;
  }


  const { isDeposit, ...withdraw } = transaction;

  const parseResult = TransactionSchema.safeParse(withdraw);

  if (parseResult.success)
    return parseResult.data;

  console.log("FindTransactionByID:Error parsing data:" + parseResult.error.format());

  return null;
}

export async function getAllWithdraws(): Promise<Transaction[] | null> {

  const withdraws = await getAllTransactionsData({ isDeposit: false })


  const parseResult = z.array(TransactionSchema).safeParse(withdraws);

  if (parseResult.success)
    return withdraws as Transaction[];


  return null;
}