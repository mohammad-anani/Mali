import { getSettingData, setSettings as set } from "../data-access-layer/settings";


export async function setSettings(LBP_Per_USD_Rate: number): Promise<boolean> {
  return await set([["LBP_Per_USD_Rate", LBP_Per_USD_Rate.toString()]])
}

export async function getSetting(name: string): Promise<string | null> {
  return await getSettingData(name);
}