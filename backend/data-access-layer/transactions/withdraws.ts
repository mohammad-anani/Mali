import { Withdraw } from "@/backend/business-layer/transactions/Withdraw";
import { createTransaction, deleteTransaction, findTransactionByID, getAllTransactions } from "./transactions";

export async function createWithdraw(withdraw: any) {
  return await createTransaction({ ...withdraw, isDeposit: false })
}

export async function findWithdrawByID(id: number) {
  const transaction = await findTransactionByID(id);

  if (!transaction || !transaction.id) {
    return transaction as Withdraw
  }

  if (transaction.isDeposit) {
    console.log("transaction is not a withdraw.Returning null");
    return null;
  }

  delete transaction.isDeposit;
  return transaction as Withdraw;

}

export async function deleteWithdraw(id: number) {
  return await deleteTransaction(id);

}

export async function getAllWithdraws() {
  return await getAllTransactions({ isDeposit: false })
}