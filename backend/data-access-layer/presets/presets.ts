import { runDb } from "../general";

export async function createPreset(preset: any) {
  try {
    const { title, amount, isLBP = 1, isDeposit = true } = preset;

    const result = await runDb((db) =>
      db.runAsync(
        `INSERT INTO Presets (title, amount, isLBP, isDeposit) VALUES (?, ?, ?, ?);`,
        [title, amount, isLBP ? 1 : 0, isDeposit ? 1 : 0]
      )
    );

    return (result as any)?.lastInsertRowId ?? 0;
  } catch (err) {
    console.error("createPreset error:", err);
    return 0;
  }
}

export async function findPresetByID(id: number): Promise<any> {
  try {
    const preset = await runDb((db) => db.getFirstAsync(`SELECT * FROM Presets WHERE id = ?;`, [id]));
    return preset ?? null;
  } catch (err) {
    console.error("findPresetByID error:", err);
    return null;
  }
}

export async function updatePreset(preset: any) {

  try {
    const { id, title, amount } = preset;
    if (!id) return false;


    const result = await runDb((db) =>
      db.runAsync(
        `UPDATE Presets SET title = ?, amount = ? WHERE id = ?;`,
        [title, amount, id]
      )
    );

    return !!((result as any)?.changes);
  } catch (err) {
    console.error("updatePreset error:", err);
    return false;
  }
}

export async function deletePreset(id: number) {
  try {
    const result = await runDb((db) => db.runAsync(`DELETE FROM Presets WHERE id = ?;`, [id]));
    return !!((result as any)?.changes);
  } catch (err) {
    console.error("deletePreset error:", err);
    return false;
  }
}

export async function getAllPresets(filter: any = {}) {
  try {
    const { title, isDeposit, isLBP, minAmount, maxAmount } = filter;
    const whereClauses: string[] = [];
    const params: any[] = [];

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

    if (minAmount !== undefined) {
      whereClauses.push("amount >= ?");
      params.push(minAmount);
    }

    if (maxAmount !== undefined) {
      whereClauses.push("amount <= ?");
      params.push(maxAmount);
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const presets = await runDb((db) => db.getAllAsync(`SELECT * FROM Presets ${whereSQL} Order By id DESC;`, params));

    return (presets as any) ?? [];
  } catch (err) {
    console.error("getAllPresets error:", err);
    return [];
  }
}
