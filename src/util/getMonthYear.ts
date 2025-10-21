export default function getMonthYear(date: string | Date) {
  const d = new Date(date);
  return {
    month: d.toLocaleString('en-US', { month: 'long' }), // "January", "February", etc.
    year: d.getFullYear()
  };
}
