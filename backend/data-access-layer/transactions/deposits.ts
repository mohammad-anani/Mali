import { Deposit } from "@/backend/business-layer/transactions/Deposit";
import { createTransaction, deleteTransaction, findTransactionByID, getAllTransactions } from "./transactions";

export async function createDeposit(deposit: any) {
  console.log("HI");
  return await createTransaction({ ...deposit, isDeposit: true })
}

export async function findDepositByID(id: number) {
  const transaction = await findTransactionByID(id);

  if (!transaction || !transaction.id) {
    return transaction as Deposit
  }

  if (!transaction.isDeposit) {
    console.log("transaction is not a deposit.Returning null");
    return null;
  }

  delete transaction.isDeposit;
  return transaction as Deposit;

}

export async function deleteDeposit(id: number) {
  return await deleteTransaction(id);

}

export async function getAllDeposits() {

  console.log("HI Dep");

  return await getAllTransactions({ isDeposit: true })
}