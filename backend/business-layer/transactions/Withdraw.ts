import { z } from "zod";

import { createTransactionData, deleteTransactionData, findTransactionByIDData, getAllTransactionsData, getTotalTransactionsData } from "@/backend/data-access-layer/transactions/transactions";
import { AddTransaction, AddTransactionSchema, Transaction, TransactionSchema, UnknowTransaction } from "./Transaction";


export async function createWithdraw(withdraw: AddTransaction): Promise<number> {

  const parseResult = AddTransactionSchema.safeParse(withdraw);

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
    console.warn(`findWithdrawByID: transaction ${id} is a deposit — returning null`);
    return null;
  }


  const { isDeposit, ...withdraw } = transaction;

  const parseResult = TransactionSchema.safeParse(withdraw);

  if (parseResult.success)
    return parseResult.data;

  console.error(`findWithdrawByID: error parsing transaction ${id}:`, parseResult.error.format());

  return null;
}

export async function getAllWithdraws(): Promise<Transaction[] | null> {

  const withdraws = await getAllTransactionsData({ isDeposit: false })


  const parseResult = z.array(TransactionSchema).safeParse(withdraws);

  if (parseResult.success)
    return withdraws as Transaction[];

  console.error('getAllWithdraws: error parsing withdraws list', parseResult.error?.format ? parseResult.error.format() : parseResult.error);
  return null;
}

export async function getTotalWithdrawssUSD(fromDate: string, toDate: string): Promise<number | null> {

  return await getTotalTransactionsData({ fromDate, toDate, isDeposit: false, isLBP: false });

}

export async function getTotalWithdrawsLBP(fromDate: string, toDate: string): Promise<number | null> {

  return await getTotalTransactionsData({ fromDate, toDate, isDeposit: false, isLBP: true });

}