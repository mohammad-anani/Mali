import { createPreset, deletePreset, findPresetByID, getAllPresets, updatePreset } from "./transactions";

export async function createWithdrawPreset(preset: any) {
  return await createPreset({ ...preset, isDeposit: false });
}

export async function findWithdrawPresetByID(id: number) {
  const p = await findPresetByID(id);
  if (!p) return null;
  return p.isDeposit ? null : p;
}

export async function updateWithdrawPreset(preset: any) {
  return await updatePreset({ ...preset, isDeposit: false });
}

export async function deleteWithdrawPreset(id: number) {
  return await deletePreset(id);
}

export async function getAllWithdrawPresets(filter: any = {}) {
  return await getAllPresets({ ...filter, isDeposit: false });
}