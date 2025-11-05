import { openDatabase } from "../general";

export async function getBalance(filter: Partial<{ fromDate: string; toDate: string; isLBP: boolean }> = {}): Promise<number> {
  try {
    const db = await openDatabase();
    if (!db) {
      console.error("getBalance: database is null");
      return 0;
    }
    const { fromDate, toDate, isLBP } = filter;
    const whereClauses: string[] = [];
    const params: (string | number)[] = [];

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
    params.push((isLBP ?? true) ? 1 : 0); // convert boolean to DB flag

    // Build WHERE clause
    const whereSQL = whereClauses.length ? ` AND ${whereClauses.join(" AND ")}` : "";

    // Prepare queries
    const depositsQuery = `SELECT SUM(amount) AS totalDeposits FROM Transactions WHERE isDeposit = 1${whereSQL}`;
    const withdrawalsQuery = `SELECT SUM(amount) AS totalWithdrawals FROM Transactions WHERE isDeposit = 0${whereSQL}`;

    // Execute queries sequentially to avoid concurrent prepare/execute on the same DB handle
    const depositResult = (await db.getFirstAsync(depositsQuery, params)) as { totalDeposits: number | null };
    const withdrawalResult = (await db.getFirstAsync(withdrawalsQuery, params)) as { totalWithdrawals: number | null };

    // Calculate final balance
    const deposits = depositResult?.totalDeposits ?? 0;
    const withdrawals = withdrawalResult?.totalWithdrawals ?? 0;

    return deposits - withdrawals;
  } catch (err) {
    console.error("getBalance error:", err);
    return 0;
  }
}
