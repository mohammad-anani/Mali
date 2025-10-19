import { createTransaction, deleteTransaction, findTransactionByID, getAllTransactions } from "./transactions";

export async function createDeposit(deposit: any) {
  console.log("HI");
  return await createTransaction({ ...deposit, isDeposit: true })
}

export async function findDepositByID(id: number) {
  const transaction = await findTransactionByID(id);

  if (!transaction || !transaction.id) {
    return transaction
  }

  if (!transaction.isDeposit) {
    console.log("transaction is not a deposit.Returning null");
    return null;
  }

  delete transaction.isDeposit;
  return transaction;

}

export async function deleteDeposit(id: number) {
  return await deleteTransaction(id);

}

export async function getAllDeposits(filter: any = {}) {

  return await getAllTransactions({ ...filter, isDeposit: true })
}