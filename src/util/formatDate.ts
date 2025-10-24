export default function formatDate(date: string) {
  return new Date(date).toLocaleString("en-US", {
    weekday: "long",    // "Monday"
    year: "numeric",    // "2025"
    month: "long",      // "October"
    day: "numeric",     // "22"
    hour: "numeric",    // "10"
    minute: "2-digit",  // "07"
    hour12: true        // Use 12-hour clock with AM/PM
  });
}
