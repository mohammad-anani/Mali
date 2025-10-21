import { z } from "zod";
import {
  createWithdraw as create,
  deleteWithdraw as Delete,
  findWithdrawByID as findByID,
  getAllWithdraws as getAll,
} from "../../data-access-layer/transactions/withdraws";
import { AddTransactionSchema, Filter, TransactionSchema } from "./Transaction";

// --- Schema and type ---
export const WithdrawSchema = TransactionSchema;
export type Withdraw = z.infer<typeof WithdrawSchema>;



export const AddWithdrawSchema = AddTransactionSchema

export type AddWithdraw = z.infer<typeof AddWithdrawSchema>


// --- Service functions ---

export async function createWithdraw(withdraw: AddWithdraw) {
  const parseResult = AddWithdrawSchema.safeParse(withdraw);
  if (parseResult.success) return await create(withdraw);

  console.error(parseResult.error.format());
  return 0;
}

export async function deleteWithdraw(id: number) {
  return await Delete(id);
}

export async function findWithdrawByID(id: number) {
  const withdraw = await findByID(id); // await added
  const parseResult = WithdrawSchema.safeParse(withdraw);

  if (parseResult.success) return withdraw;

  console.error(parseResult.error.format());
  return null;
}

export async function getAllWithdraws(filter?: Filter) {
  const withdraws = await getAll(filter); // await added
  const parseResult = z.array(WithdrawSchema).safeParse(withdraws);

  if (parseResult.success) return parseResult.data;

  console.error(parseResult.error.format());
  return null;
}
