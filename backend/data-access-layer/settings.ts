/**
 * Get a setting value by name
 * @param name The name of the setting
 * @returns The value as string, or null if not found
 */
import { openDatabase } from "./general";
export async function getSetting(name: string): Promise<string | null> {
  try {
    const db = await openDatabase();
    if (!db) {
      console.error("getSetting: database is null");
      return null;
    }
    const res = await db.getFirstAsync(
      `SELECT value FROM Settings WHERE name = ?`,
      [name]
    ) as { value: string };
    return res ? res.value : null;
  } catch (err) {
    console.error("getSetting error:", err);
    return null;
  }
}

/**
 * Get all settings as an object { [name]: value }
 */
export async function getSettings(): Promise<[string, string][]> {
  try {
    const db = await openDatabase();
    if (!db) {
      console.error("getSettings: database is null");
      return [];
    }
    const res = await db.getAllAsync(`SELECT name, value FROM Settings`) as { name: string, value: string }[];
    return res.map((setting) => [setting.name, setting.value]);
  } catch (err) {
    console.error("getSettings error:", err);
    return [];
  }
}

/**
 * Insert or update multiple settings
 * @param settings Array of [name, value] tuples
 */
export async function setSettings(settings: [string, string][]) {
  try {
    const db = await openDatabase();
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
