import { z } from "zod"

export const TransactionSchema = z.object(
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
    presetID: z.number().positive().nullable()
  }
)

export type Transaction = z.infer<typeof TransactionSchema>

export const AddTransactionSchema = TransactionSchema.omit({ id: true, date: true })

export type AddTransaction = z.infer<typeof AddTransactionSchema>



