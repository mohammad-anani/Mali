import { createDeposit as create, deleteDeposit as Delete, findDepositByID as findByID, getAllDeposits as getAll } from "@/data-access-layer/transactions/deposits"
import { z } from "zod"
import { Filter, TransactionSchema } from "./Transaction"


export const DepositSchema = TransactionSchema

export type Deposit = z.infer<typeof DepositSchema>

export async function createDeposit(deposit: Deposit) {


  const parseResult = DepositSchema.safeParse(deposit);

  if (parseResult.success)
    return await create(deposit);


  console.log(parseResult.error.format());

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

  console.log(parseResult.error);

  return null;
}

export async function getAllDeposits(filter: Filter) {

  const deposits = await getAll(filter);

  const parseResult = z.array(DepositSchema).safeParse(deposits);

  if (parseResult.success)
    return deposits;

  console.log(parseResult.error.format());

  return null;
}