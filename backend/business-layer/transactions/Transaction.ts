import { z } from "zod";

export const UnknownTransactionSchema = z.object(
  {
    id: z.number().positive(),
    title: z.string().min(3),
    amount: z.number().positive(),
    isLBP: z.preprocess((val) =>
      typeof val === "number"
      &&
      !(val !== 0 && val !== 1)

      &&
      !!val, z.boolean()
    ),
    date: z.preprocess((val) =>
      new Date(val as string).toISOString(), z.string().datetime()),
    presetID: z.number().positive().nullable().optional(),
    isDeposit: z.preprocess((val) =>
      typeof val === "number"
      &&
      !(val !== 0 && val !== 1)

      &&
      !!val, z.boolean()
    )
  }
)

export const TransactionSchema = UnknownTransactionSchema.omit({ isDeposit: true });
export const AddTransactionSchema = TransactionSchema.omit({ id: true, date: true })

export type UnknowTransaction = z.infer<typeof UnknownTransactionSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type AddTransaction = z.infer<typeof AddTransactionSchema>



