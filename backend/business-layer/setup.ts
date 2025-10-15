import { initDatabase } from "../data-access-layer/setup";
import { AddDeposit } from "./transactions/Deposit";


export async function init(LBP_Per_USD_Rate: number, initDeposit_LBP_Amount: number, initDeposit_USD_Amount: number) {

  const deposit_USD: AddDeposit = { title: "First Deposit in USD", isLBP: false, amount: initDeposit_USD_Amount }
  const deposit_LBP: AddDeposit = { title: "First Deposit in LBP", isLBP: true, amount: initDeposit_LBP_Amount }


  return await initDatabase([["LBP_Per_USD_Rate", LBP_Per_USD_Rate.toString()]], deposit_LBP, deposit_USD)



}