import { DBNewTransaction, DBTransactionRow } from "../dalTypes";
import { runDb } from "../general";

export async function createTransactionData(transaction: DBNewTransaction): Promise<number> {
  try {
    const { title, amount, isLBP, isDeposit, presetID = null } = transaction;

    const result = await runDb(async (db) =>
      db.runAsync(
        `INSERT INTO Transactions (title, amount, isLBP, isDeposit, presetID,date)
         VALUES (?, ?, ?, ?, ?,?);`,
        [title, amount, isLBP ? 1 : 0, isDeposit ? 1 : 0, presetID, transaction.date ?? new Date().toISOString()]
      )
    );

    return (result as { lastInsertRowId?: number })?.lastInsertRowId ?? 0;
  } catch (err) {
    console.error("Create error:", err);
    return 0;
  }
}

export async function findTransactionByIDData(id: number): Promise<DBTransactionRow | null> {
  try {
    const transaction = await runDb(async (db) =>
      db.getFirstAsync(`SELECT * FROM Transactions WHERE id = ?;`, [id])
    );

    if (!transaction) return null;

    const t = transaction as any;
    // convert numeric DB flags to booleans
    return {
      id: t.id,
      title: t.title,
      amount: t.amount,
      isLBP: !!t.isLBP,
      isDeposit: !!t.isDeposit,
      date: t.date,
      presetID: t.presetID ?? null,
    } as DBTransactionRow;
  } catch (err) {
    console.error("findByID error:", err);
    return null;
  }
}

export async function deleteTransactionData(id: number) {
  try {
    const result = await runDb(async (db) =>
      db.runAsync(`DELETE FROM Transactions WHERE id = ?;`, [id])
    );

    return !!((result as any)?.changes);
  } catch (err) {
    console.error("Delete error:", err);
    return false;
  }
}
export async function getAllTransactionsData(filter: Partial<{
  fromDate: string;
  toDate: string;
  presetID: number;
  title: string;
  isDeposit: boolean;
  isLBP: boolean;
}> = {}): Promise<DBTransactionRow[]> {
  try {
    const { fromDate, toDate, presetID, title, isDeposit, isLBP } = filter;
    const whereClauses: string[] = [];
    const params: (string | number | null)[] = [];

    if (fromDate) {
      whereClauses.push("date >= ?");
      params.push(fromDate);
    }

    if (toDate) {
      whereClauses.push("date <= ?");
      params.push(toDate);
    }

    if (presetID) {
      whereClauses.push("presetID = ?");
      params.push(presetID);
    }

    if (title) {
      whereClauses.push("title LIKE ?");
      params.push(`%${title}%`);
    }

    if (isDeposit !== undefined) {
      whereClauses.push("isDeposit = ?");
      params.push(isDeposit ? 1 : 0);
    }

    if (isLBP !== undefined) {
      whereClauses.push("isLBP = ?");
      params.push(isLBP ? 1 : 0);
    }

    const whereSQL =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const transactions = await runDb((db) =>
      db.getAllAsync(`SELECT * FROM Transactions ${whereSQL} ORDER BY date DESC;`, params)
    );

    const list = (transactions as any[]) ?? [];
    return list.map((t) => ({
      id: t.id,
      title: t.title,
      amount: t.amount,
      isLBP: !!t.isLBP,
      isDeposit: !!t.isDeposit,
      date: t.date,
      presetID: t.presetID ?? null,
    } as DBTransactionRow));
  } catch (err) {
    console.error("getAll error:", err);
    return [];
  }
}

export async function getOldestTransactionDateData(): Promise<string | null> {
  try {
    const { date } = (await runDb(async (db) =>
      db.getFirstAsync(`SELECT MIN(date) AS date FROM Transactions`)
    )) as { date: string };
    return date ?? null;
  } catch (err) {
    console.error("getOldestTransactionDate error:", err);
    return null;
  }
}

export async function getTotalTransactionsData(filter: Partial<{
  fromDate: string;
  toDate: string;
  presetID: number;
  title: string;
  isDeposit: boolean;
  isLBP: boolean;
}> = {}): Promise<number> {
  try {
    const { fromDate, toDate, presetID, title, isDeposit, isLBP } = filter;
    const whereClauses: string[] = [];
    const params: (string | number | null)[] = [];

    if (fromDate) {
      whereClauses.push("date >= ?");
      params.push(fromDate);
    }

    if (toDate) {
      whereClauses.push("date <= ?");
      params.push(toDate);
    }

    if (presetID) {
      whereClauses.push("presetID = ?");
      params.push(presetID);
    }

    if (title) {
      whereClauses.push("title LIKE ?");
      params.push(`%${title}%`);
    }

    if (isDeposit !== undefined) {
      whereClauses.push("isDeposit = ?");
      params.push(isDeposit ? 1 : 0);
    }

    if (isLBP !== undefined) {
      whereClauses.push("isLBP = ?");
      params.push(isLBP ? 1 : 0);
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
    const { total } = (await runDb((db) =>
      db.getFirstAsync(`SELECT COALESCE(SUM(amount), 0) AS total FROM Transactions ${whereSQL};`, params)
    )) as { total: number | null };
    return total ?? 0;
  } catch (err) {
    console.error("getTotal error:", err);
    return 0;
  }
}
