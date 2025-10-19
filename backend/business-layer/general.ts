import { checkAllDatabaseTablesExist } from "../data-access-layer/general";

export async function CheckDatabaseExists() {
  return await checkAllDatabaseTablesExist();
}