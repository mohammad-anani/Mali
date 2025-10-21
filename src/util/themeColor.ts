export default function themeColor(isWithdraw: boolean, prefix = "bg-") {
  return prefix + (isWithdraw ? 'destroy' : 'primary');
}