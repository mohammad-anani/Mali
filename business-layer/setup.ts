import { setSettings } from "./Settings";
import { AddDeposit, createDeposit } from "./transactions/Deposit";


export async function init(name: string, LBP_Per_USD_Rate: number, initDeposit_LBP_Amount: number, initDeposit_USD_Amount: number) {

  const deposit_USD: AddDeposit = { title: "First Deposit in USD", isLBP: false, amount: initDeposit_USD_Amount }
  const deposit_LBP: AddDeposit = { title: "First Deposit in LBP", isLBP: true, amount: initDeposit_LBP_Amount }

  const deposit_usd = await createDeposit(deposit_USD);
  const deposit_lbp = await createDeposit(deposit_LBP);
  const settings_result = await setSettings(name, LBP_Per_USD_Rate);

  return deposit_lbp && deposit_usd && settings_result;

}