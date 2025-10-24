import { createWithdrawPreset as create, deleteWithdrawPreset as del, findWithdrawPresetByID as findByID, getAllWithdrawPresets as getAll, updateWithdrawPreset as update } from '@/backend/data-access-layer/presets/withdraws';
import { z } from 'zod';
import { AddPresetSchema, PresetSchema } from './transactions';

export const WithdrawPresetSchema = PresetSchema.extend({ isDeposit: z.literal(false) });
export type WithdrawPreset = z.infer<typeof WithdrawPresetSchema>;

export const AddWithdrawPresetSchema = AddPresetSchema.extend({ isDeposit: z.literal(false) });
export type AddWithdrawPreset = z.infer<typeof AddWithdrawPresetSchema>;

export async function createWithdraw(preset: AddWithdrawPreset) {
  const parsed = AddWithdrawPresetSchema.safeParse(preset);
  if (!parsed.success) {
    console.error('createWithdraw preset validation failed', parsed.error.format());
    return 0;
  }
  return await create(preset);
}

export async function findWithdraw(id: number) {
  const p = await findByID(id);
  if (!p) return null;
  const parsed = WithdrawPresetSchema.safeParse(p);
  if (!parsed.success) return null;
  return parsed.data as WithdrawPreset;
}

export async function updateWithdraw(preset: WithdrawPreset) {
  const parsed = WithdrawPresetSchema.safeParse(preset);
  if (!parsed.success) {
    console.error('updateWithdraw validation failed', parsed.error.format());
    return false;
  }
  return await update(preset);
}

export async function deleteWithdraw(id: number) {
  return await del(id);
}

export async function getAllWithdrawPresets(filter: any = {}) {
  return await getAll({ ...filter, isDeposit: false });
}
