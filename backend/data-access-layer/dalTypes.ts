export interface DBTransactionRow {
  id: number;
  title: string;
  amount: number;
  // DAL exposes booleans to the business layer; DB stores 0/1 but DAL converts.
  isLBP: boolean;
  isDeposit: boolean;
  date: string;
  presetID?: number | null;
}

export interface DBNewTransaction {
  title: string;
  amount: number;
  isLBP: boolean;
  isDeposit: boolean;
  presetID?: number | null;
  date?: string;
}

export interface DBPresetRow {
  id: number;
  title: string;
  amount: number;
  isLBP: boolean;
  isDeposit: boolean;
}

export interface DBNewPreset {
  title: string;
  amount: number;
  isLBP?: boolean;
  isDeposit?: boolean;
}
