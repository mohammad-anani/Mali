import { z } from "zod";

import { createTransactionData, deleteTransactionData, findTransactionByIDData, getAllTransactionsData } from "@/backend/data-access-layer/transactions/transactions";
import { AddTransaction, Transaction, TransactionSchema, UnknowTransaction } from "./Transaction";


export async function createDeposit(deposit: AddTransaction) {

  const parseResult = TransactionSchema.safeParse(deposit);

  if (parseResult.success)
    return await createTransactionData({ ...deposit, isDeposit: true });

  return 0;

}

export async function deleteDeposit(id: number) {
  return await deleteTransactionData(id);
}

export async function findDepositByID(id: number): Promise<Transaction | null> {

  const transaction = await findTransactionByIDData(id) as UnknowTransaction | null;

  if (!transaction || !transaction.id) {
    return null;
  }

  if (!transaction.isDeposit) {
    console.log("transaction is not a deposit.Returning null");
    return null;
  }


  const { isDeposit, ...deposit } = transaction;

  const parseResult = TransactionSchema.safeParse(deposit);

  if (parseResult.success)
    return parseResult.data;

  console.log("FindTransactionByID:Error parsing data:" + parseResult.error.format());

  return null;
}

export async function getAllDeposits(): Promise<Transaction[] | null> {

  const deposits = await getAllTransactionsData({ isDeposit: true })


  const parseResult = z.array(TransactionSchema).safeParse(deposits);

  if (parseResult.success)
    return deposits as Transaction[];


  return null;
}