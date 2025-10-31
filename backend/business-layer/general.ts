import { checkAllDatabaseTablesExist } from "../data-access-layer/general";

export async function CheckDatabaseExists(): Promise<boolean> {
  return await checkAllDatabaseTablesExist();
}