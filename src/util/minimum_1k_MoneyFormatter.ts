
export function minimum_1k_MoneyFormatter(amount: number) {
  return (Math.floor((amount) / 1000) * 1000)
}