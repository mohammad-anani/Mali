export default function themeColor(isDeposit: boolean, prefix = "bg-", suffix = "") {
  return prefix + (isDeposit ? 'primary' : 'destroy') + suffix;
}