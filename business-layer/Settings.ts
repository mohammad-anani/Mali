import { setSettings as set } from "@/data-access-layer/settings";


export async function setSettings(Name: string, LBP_Per_USD_Rate: number) {
  return await set([["Name", Name], ["LBP_Per_USD_Rate", LBP_Per_USD_Rate.toString()]])
}