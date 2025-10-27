import { z } from 'zod';
import {
  createPreset as create,
  deletePreset as del,
  findPresetByID as findByID,
  getAllPresets as getAll,
  updatePreset as update,
} from '../../data-access-layer/presets/transactions';

// Preset schema mirrors the DB table: id, title, amount, isLBP, isDeposit
export const PresetSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(3),
  amount: z.number().positive(),
  isLBP: z.preprocess((val) => typeof val === 'number' ? !!val : !!val, z.boolean()),
});

export type Preset = z.infer<typeof PresetSchema>;

export const AddPresetSchema = PresetSchema.omit({ id: true });
export type AddPreset = z.infer<typeof AddPresetSchema>;

// Service functions
export async function createPreset(preset: AddPreset) {
  const result = AddPresetSchema.safeParse(preset);
  if (!result.success) {
    console.error('createPreset validation failed', result.error.format());
    return 0;
  }

  return await create(preset);
}

export async function findPreset(id: number) {
  const p = await findByID(id);
  const parsed = PresetSchema.safeParse(p);
  if (!parsed.success) {
    console.error('findPreset: invalid preset data', parsed.error.format());
    return null;
  }
  return parsed.data as Preset;
}

export async function updatePreset(preset: Preset) {
  const parsed = PresetSchema.safeParse(preset);
  if (!parsed.success) {
    console.error('updatePreset validation failed', parsed.error.format());
    return false;
  }
  return await update(preset);
}

export async function deletePreset(id: number) {
  return await del(id);
}

export async function getAllPresets(filter: any = {}) {
  const presets = await getAll(filter);
  const arrParse = z.array(PresetSchema).safeParse(presets || []);
  if (!arrParse.success) {
    console.error('getAllPresets: invalid data', arrParse.error.format());
    return null;
  }
  return arrParse.data as Preset[];
}
