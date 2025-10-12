import * as SQLite from "expo-sqlite";

/**
 * Open or get the database
 */
export async function getDatabase(): Promise<SQLite.SQLiteDatabase | null> {
  try {
    const db = await SQLite.openDatabaseAsync("mali.db");
    return db;
  } catch (err) {
    console.error("getDatabase error", err);
    return null;
  }
}

/**
 * Check if the expected tables exist
 */
export async function checkDatabaseExists(
  dbParam?: SQLite.SQLiteDatabase
): Promise<boolean> {
  try {
    const db = dbParam || (await getDatabase());
    if (!db) return false;

    const tables = (await db.getAllAsync(
      `SELECT name FROM sqlite_master WHERE type='table'`
    )) as { name: string }[];

    const tableNames = tables.map((t) => t.name);
    return (
      tableNames.includes("Presets") &&
      tableNames.includes("Transactions") &&
      tableNames.includes("Settings")
    );
  } catch (err) {
    console.error("checkDatabaseExists error", err);
    return false;
  }
}

/**
 * Delete (reset) the entire database file
 */
export async function deleteDatabase(): Promise<boolean> {
  try {
    await SQLite.deleteDatabaseAsync("mali.db");
    console.log("Database reset: mali.db deleted successfully.");
    return true;
  } catch (err) {
    console.error("resetDatabase error", err);
    return false;
  }
}

/**
 * Create the database tables if they don't exist
 */
export async function createDatabase(): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (!db) return false;

    if (await checkDatabaseExists(db)) {
      console.log("Database exists. Skipping creation.");
      return true;
    }

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Presets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL CHECK (LENGTH(title) >= 3),
        amount INTEGER CHECK (amount >= 1),
        isLBP INTEGER NOT NULL,
        isDeposit INTEGER NOT NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL CHECK (LENGTH(title) >= 3),
        amount INTEGER NOT NULL CHECK (amount >= 1),
        isLBP INTEGER NOT NULL,
        isDeposit INTEGER NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        presetID INTEGER,
        FOREIGN KEY (presetID) REFERENCES Presets(id)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        value TEXT NOT NULL
      );
    `);

    console.log("Database created with tables Presets, Transactions, and Settings.");
    return true;
  } catch (err) {
    console.error("createDatabase error", err);
    return false;
  }
}
