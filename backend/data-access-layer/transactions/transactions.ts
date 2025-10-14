import { getDatabase } from "../general";

export async function createTransaction(transaction: any) {
  try {
    const db = await getDatabase();
    if (!db) {
      console.error("Create: database is null");
      return 0;
    }

    const { title, amount, isLBP, isDeposit, presetID = null } = transaction;

    const result = await db.runAsync(
      `INSERT INTO Transactions (title, amount, isLBP, isDeposit, presetID)
       VALUES (?, ?, ?, ?, ?);`,
      [title, amount, isLBP, isDeposit, presetID]
    );

    return result.lastInsertRowId ?? 0;
  } catch (err) {
    console.error("Create error:", err);
    return 0;
  }
}

export async function findTransactionByID(id: number): Promise<any> {
  try {
    const db = await getDatabase();
    if (!db) {
      console.error("findByID: database is null");
      return null;
    }

    const transaction = await db.getFirstAsync(
      `SELECT * FROM Transactions WHERE id = ?;`,
      [id]
    );

    return transaction ?? { id: 0 }
  } catch (err) {
    console.error("findByID error:", err);
    return null;
  }
}

export async function deleteTransaction(id: number) {
  try {
    const db = await getDatabase();
    if (!db) {
      console.error("Delete: database is null");
      return -1;
    }

    const result = await db.runAsync(
      `DELETE FROM Transactions WHERE id = ?;`,
      [id]
    );

    return result.changes ?? 0;
  } catch (err) {
    console.error("Delete error:", err);
    return -1;
  }
}

export async function getAllTransactions(filter: any = {}) {
  try {
    const db = await getDatabase();
    if (!db) {
      console.error("getAll: database is null");
      return [];
    }

    const { fromDate, toDate, presetID, title, isDeposit } = filter;
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
      params.push(isDeposit);
    }

    const whereSQL =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const transactions = await db.getAllAsync(
      `SELECT * FROM Transactions ${whereSQL};`,
      params
    );

    return transactions ?? [];
  } catch (err) {
    console.error("getAll error:", err);
    return [];
  }
}
