import { setSettings } from "./settings";
import { createDeposit } from "./transactions/deposits";

export async function initDatabase(settings: [string, string][], initSettings: any[], initDeposit_LBP: any, initDeposit_USD: any) {

  const deposit_usd = await createDeposit(initDeposit_USD);
  const deposit_lbp = await createDeposit(initDeposit_LBP);
  const settings_result = await setSettings(settings);

  return deposit_lbp && deposit_usd && settings_result;

}