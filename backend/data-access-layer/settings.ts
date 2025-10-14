import { getDatabase } from "./general";

/**
 * Insert or update multiple settings
 * @param settings Array of [name, value] tuples
 */
export async function setSettings(settings: [string, string][]) {
  try {
    const db = await getDatabase();
    if (!db) {
      console.error("setSettings: database is null");
      return false;
    }

    for (const [name, value] of settings) {
      await db.runAsync(
        `INSERT INTO Settings (name, value)
         VALUES (?, ?)
         ON CONFLICT(name) DO UPDATE SET
           value = excluded.value;`,
        [name, value]
      );
    }

    return true; // success
  } catch (err) {
    console.error("setSettings error:", err);
    return false;
  }
}
