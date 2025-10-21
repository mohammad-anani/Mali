import * as SQLite from "expo-sqlite";

// Module-level cached database instance to avoid opening multiple handles
let cachedDb: SQLite.SQLiteDatabase | null = null;

// Simple promise-queue (mutex) to serialize DB operations that might call
// prepare/exec concurrently on the same native DB handle.
let dbQueue: Promise<void> = Promise.resolve();

export async function runDb<T>(cb: (db: SQLite.SQLiteDatabase) => Promise<T>): Promise<T | null> {
  try {
    const db = await openDatabase();
    if (!db) return null;

    // chain onto the queue so operations run sequentially
    const p = dbQueue.then(async () => {
      try {
        return await cb(db);
      } catch (err) {
        // bubble up
        throw err;
      }
    });

    // ensure queue continues after this op
    dbQueue = p.then(() => undefined).catch(() => undefined);

    return await p;
  } catch (err) {
    console.error("runDb error", err);
    return null;
  }
}

/**
 * Open or get the database
 */
export async function openDatabase(): Promise<SQLite.SQLiteDatabase | null> {
  try {
    // Return cached instance when available
    if (cachedDb) return cachedDb;

    const db = await SQLite.openDatabaseAsync("mali.db");

    // basic sanity check: run a no-op statement to ensure the native DB is ready
    try {
      await db.execAsync("PRAGMA foreign_keys = ON;");
    } catch (err) {
      // if this fails, log it but still return the db; callers will handle subsequent errors
      console.warn("openDatabase: warning running PRAGMA", err);
    }

    cachedDb = db;
    return cachedDb;
  } catch (err) {
    console.error("getDatabase error", err);
    cachedDb = null;
    return null;
  }
}

/**
 * Check if the expected tables exist
 */
export async function checkAllDatabaseTablesExist(
  dbParam?: SQLite.SQLiteDatabase
): Promise<boolean> {
  try {

    const db = dbParam || (await openDatabase());
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

export async function resetDatabase(): Promise<boolean> {
  try {
    const db = await openDatabase();
    if (!db) {
      console.error("resetDatabase: database is null");
      return false;
    }

    // Disable foreign key checks to allow deletion in any order
    await db.execAsync("PRAGMA foreign_keys = OFF;");

    // List your tables explicitly (safer than querying sqlite_master)
    const tables = ["Transactions", "Presets", "Settings"];

    // Clear all data
    for (const table of tables) {
      await db.execAsync(`DELETE FROM ${table};`);
      // Reset autoincrement counters (optional, but neat)
      await db.execAsync(`DELETE FROM sqlite_sequence WHERE name='${table}';`);
    }

    // Re-enable foreign key checks
    await db.execAsync("PRAGMA foreign_keys = ON;");

    console.log("All tables cleared successfully.");
    return true;
  } catch (err) {
    console.error("resetDatabase error", err);
    return false;
  }
}

/**
 * Create the database tables if they don't exist
 */
export async function createDatabaseTables(): Promise<boolean> {
  try {
    let db = await openDatabase();
    if (!db) return false;


    if (await checkAllDatabaseTablesExist(db)) {


      return await resetDatabase();

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
        name TEXT NOT NULL PRIMARY KEY,
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
