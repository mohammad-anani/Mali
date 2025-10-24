import { runDb } from "../general";

export async function createTransaction(transaction: any) {
  try {

    console.log(transaction);

    const { title, amount, isLBP, isDeposit, presetID = null } = transaction;

    const result = await runDb(async (db) =>
      db.runAsync(
        `INSERT INTO Transactions (title, amount, isLBP, isDeposit, presetID,date)
         VALUES (?, ?, ?, ?, ?,?);`,
        [title, amount, isLBP, isDeposit, presetID, new Date().toISOString(),]
      )
    );

    return (result as any)?.lastInsertRowId ?? 0;
  } catch (err) {
    console.error("Create error:", err);
    return 0;
  }
}

export async function findTransactionByID(id: number): Promise<any> {
  try {
    const transaction = await runDb(async (db) =>
      db.getFirstAsync(`SELECT * FROM Transactions WHERE id = ?;`, [id])
    );

    return transaction ?? { id: 0 };
  } catch (err) {
    console.error("findByID error:", err);
    return null;
  }
}

export async function deleteTransaction(id: number) {
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

export async function getAllTransactions(filter: any = {}) {
  try {
    // run queries through the serialized runDb helper

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

    const transactions = await runDb((db) =>
      db.getAllAsync(`SELECT * FROM Transactions ${whereSQL} order by date desc;`, params)
    );

    return (transactions as any) ?? [];
  } catch (err) {

    console.error("getAll error:", err);
    return [];
  }
}
