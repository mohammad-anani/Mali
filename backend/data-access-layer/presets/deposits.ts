import { createPreset, deletePreset, findPresetByID, getAllPresets, updatePreset } from "./transactions";

export async function createDepositPreset(preset: any) {
  return await createPreset({ ...preset, isDeposit: true });
}

export async function findDepositPresetByID(id: number) {
  const p = await findPresetByID(id);
  if (!p) return null;
  return p.isDeposit ? p : null;
}

export async function updateDepositPreset(preset: any) {
  return await updatePreset({ ...preset, isDeposit: true });
}

export async function deleteDepositPreset(id: number) {
  return await deletePreset(id);
}

export async function getAllDepositPresets(filter: any = {}) {
  return await getAllPresets({ ...filter, isDeposit: true });
}