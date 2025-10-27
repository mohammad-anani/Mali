export default function getMode(isDeposit: boolean) {
  return isDeposit ? "Deposit" : "Withdraw";
}