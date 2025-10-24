import { createDepositPreset as create, deleteDepositPreset as del, findDepositPresetByID as findByID, getAllDepositPresets as getAll, updateDepositPreset as update } from '@/backend/data-access-layer/presets/deposits';
import { z } from 'zod';
import { AddPresetSchema, PresetSchema } from './transactions';

export const DepositPresetSchema = PresetSchema.extend({ isDeposit: z.literal(true) });
export type DepositPreset = z.infer<typeof DepositPresetSchema>;

export const AddDepositPresetSchema = AddPresetSchema.extend({ isDeposit: z.literal(true) });
export type AddDepositPreset = z.infer<typeof AddDepositPresetSchema>;

export async function createDeposit(preset: AddDepositPreset) {
  const parsed = AddDepositPresetSchema.safeParse(preset);
  if (!parsed.success) {
    console.error('createDeposit preset validation failed', parsed.error.format());
    return 0;
  }
  return await create(preset);
}

export async function findDeposit(id: number) {
  const p = await findByID(id);
  if (!p) return null;
  const parsed = DepositPresetSchema.safeParse(p);
  if (!parsed.success) return null;
  return parsed.data as DepositPreset;
}

export async function updateDeposit(preset: DepositPreset) {
  const parsed = DepositPresetSchema.safeParse(preset);
  if (!parsed.success) {
    console.error('updateDeposit validation failed', parsed.error.format());
    return false;
  }
  return await update(preset);
}

export async function deleteDeposit(id: number) {
  return await del(id);
}

export async function getAllDepositPresets() {
  return await getAll({ isDeposit: true });
}
