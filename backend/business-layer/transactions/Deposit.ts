import { z } from "zod"
import { createDeposit as create, deleteDeposit as Delete, findDepositByID as findByID, getAllDeposits as getAll } from "../../data-access-layer/transactions/deposits"
import { AddTransactionSchema, Filter, TransactionSchema } from "./Transaction"


export const DepositSchema = TransactionSchema

export type Deposit = z.infer<typeof DepositSchema>


export const AddDepositSchema = AddTransactionSchema

export type AddDeposit = z.infer<typeof AddDepositSchema>

export async function createDeposit(deposit: AddDeposit) {


  const parseResult = DepositSchema.safeParse(deposit);

  if (parseResult.success)
    return await create(deposit);




  return 0;

}

export async function deleteDeposit(id: number) {
  return await Delete(id);
}

export async function findDepositByID(id: number) {
  const deposit = await findByID(id);

  const parseResult = DepositSchema.safeParse(deposit);

  if (parseResult.success)
    return deposit;


  return null;
}

export async function getAllDeposits(filter?: Filter) {

  const deposits = await getAll(filter);


  const parseResult = z.array(DepositSchema).safeParse(deposits);

  if (parseResult.success)
    return deposits;


  return null;
}