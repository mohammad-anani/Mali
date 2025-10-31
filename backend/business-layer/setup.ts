import { createDatabaseTables } from "../data-access-layer/general";
import { setSettings } from "./Settings";
import { createDeposit } from "./transactions/deposit";
import { AddTransaction } from "./transactions/Transaction";


export async function initDatabase(LBP_Per_USD_Rate: number, initDeposit_LBP_Amount: number, initDeposit_USD_Amount: number) {

  const deposit_USD: AddTransaction = { title: "First Deposit in USD", isLBP: false, amount: initDeposit_USD_Amount }
  const deposit_LBP: AddTransaction = { title: "First Deposit in LBP", isLBP: true, amount: initDeposit_LBP_Amount };


  if (await createDatabaseTables()) {

    const deposit_usd = await createDeposit(deposit_USD);
    const deposit_lbp = await createDeposit(deposit_LBP);
    const settings_result = await setSettings(LBP_Per_USD_Rate);

    return deposit_lbp && deposit_usd && settings_result;
  }

}