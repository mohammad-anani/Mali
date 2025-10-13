import { z } from "zod"

export const TransactionSchema = z.object(
  {
    id: z.number().positive(),
    title: z.string().min(3),
    amount: z.number().positive(),
    isLBP: z.boolean(),
    date: z.string().datetime(),
    presetID: z.number().positive().optional()
  }
)

export type Transaction = z.infer<typeof TransactionSchema>

export const AddTransactionSchema = TransactionSchema.omit({ id: true, date: true })

export type AddTransaction = z.infer<typeof AddTransactionSchema>



export const FilterSchema = z.object(
  {
    title: z.string().optional(),
    fromDate: z.string().datetime().optional(),
    toDate: z.string().datetime().optional(),
    presetID: z.number().optional(),
  }
)

export type Filter = z.infer<typeof FilterSchema>
