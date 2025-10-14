export function moneyToString(value: string): string {
  // Remove all non-digit characters
  const digits = String(value ?? "").replace(/\D/g, "");
  if (!digits) return "";
  // Format with space every 3 digits from the right
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
