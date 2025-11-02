import { createPreset, deletePreset, findPresetByID, getAllPresets, updatePreset } from '@/backend/data-access-layer/presets/presets';
import { AddPreset, AddPresetSchema, Preset, PresetSchema } from './Preset';


export async function createDepositPreset(preset: AddPreset): Promise<number> {
  const parsed = AddPresetSchema.safeParse(preset);
  if (!parsed.success) {
    console.error('createDeposit preset validation failed', parsed.error.format());
    return 0;
  }
  return await createPreset({ ...preset, isDeposit: true });
}

export async function findDepositPreset(id: number): Promise<Preset | null> {
  const p = await findPresetByID(id);
  if (!p) return null;

  const parsed = PresetSchema.safeParse(p);
  if (!parsed.success) return null;
  return parsed.data as Preset;
}

export async function updateDepositPreset(preset: Preset): Promise<boolean> {
  const parsed = AddPresetSchema.safeParse(preset);
  if (!parsed.success) {
    console.error('updateDeposit validation failed', parsed.error.format());
    return false;
  }
  return await updatePreset(preset);
}

export async function deleteDepositPreset(id: number): Promise<boolean> {
  return await deletePreset(id);
}

export async function getAllDepositPresets(): Promise<Preset[] | null> {
  return await getAllPresets({ isDeposit: true });
}
