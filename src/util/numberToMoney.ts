/**
 * Formats a number or numeric string as a money string with spaces.
 * Handles empty, non-numeric, leading zeros, decimals, negatives, etc.
 */
export function numberToMoney(value: string | number): string {
  if (value === null || value === undefined || value === '') return '';

  // Keep only digits, dot, minus
  let str = String(value).replace(/[^\d.-]/g, '');
  if (str === '' || isNaN(Number(str))) return '';

  const isNegative = str.startsWith('-');
  str = str.replace(/^-/, ''); // remove negative sign for now

  let [intPart, decPart] = str.split('.');
  intPart = intPart.replace(/^0+(?!$)/, ''); // remove leading zeros
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add spaces every 3 digits

  let formatted = decPart !== undefined ? `${intPart}.${decPart}` : intPart;
  if (isNegative && formatted !== '') formatted = '-' + formatted;

  return formatted;
}

export function moneySign(value: string | number) {
  const amount = numberToMoney(+value);

  return +value > 0 ? "+" + amount : amount;
}
