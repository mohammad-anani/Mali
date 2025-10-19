import { openDatabase } from "../general";

export async function getBalance(filter: any = {}) {
  try {
    const db = await openDatabase();
    if (!db) {
      console.error("getBalance: database is null");
      return 0;
    }

    const { fromDate, toDate, isLBP } = filter;
    const whereClauses: string[] = [];
    const params: any[] = [];

    if (fromDate) {
      whereClauses.push("date >= ?");
      params.push(fromDate);
    }

    if (toDate) {
      whereClauses.push("date <= ?");
      params.push(toDate);
    }

    // always include currency condition (default to LBP if not passed)
    whereClauses.push("isLBP = ?");
    params.push(isLBP ?? 1); // 1 = LBP, 0 = USD or other

    // Build WHERE clause
    const whereSQL = whereClauses.length ? ` AND ${whereClauses.join(" AND ")}` : "";

    // Prepare queries
    const depositsQuery = `SELECT SUM(amount) AS totalDeposits FROM transactions WHERE isDeposit = 1${whereSQL}`;
    const withdrawalsQuery = `SELECT SUM(amount) AS totalWithdrawals FROM transactions WHERE isDeposit = 0${whereSQL}`;

    // Execute both in parallel
    const [depositResult, withdrawalResult] = await Promise.all([
      db.getFirstAsync(depositsQuery, params),
      db.getFirstAsync(withdrawalsQuery, params),
    ]) as [{ totalDeposits: number | null }, { totalWithdrawals: number | null }];

    // Calculate final balance
    const deposits = depositResult?.totalDeposits ?? 0;
    const withdrawals = withdrawalResult?.totalWithdrawals ?? 0;

    return deposits - withdrawals;
  } catch (err) {
    console.error("getBalance error:", err);
    return 0;
  }
}
