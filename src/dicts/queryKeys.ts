// Centralized query keys for react-query use across the app
// Use the helper functions for parameterized keys (by id / by mode)

export const QUERY_KEYS = {
  balances: {
    usd: ["usdBalance"] as const,
    lbp: ["lbpBalance"] as const,
  },

  transactions: {
    list: {
      deposits: ["getDeposits"] as const,
      withdraws: ["getWithdraws"] as const,
      of: (isDeposit: boolean) => (isDeposit ? ["getDeposits"] as const : ["getWithdraws"] as const),
    },
    item: {
      byId: (isDeposit: boolean, id: string | number) => (isDeposit ? ["getDeposit", id] as const : ["getWithdraw", id] as const),
    },
    // convenience callback returning both list and item helpers for a given mode
    of: (isDeposit: boolean) => ({
      list: isDeposit ? ["getDeposits"] as const : ["getWithdraws"] as const,
      item: (id: string | number) => (isDeposit ? ["getDeposit", id] as const : ["getWithdraw", id] as const),
    }),
  },

  presets: {
    list: {
      deposits: ["getDepositPresets"] as const,
      withdraws: ["getWithdrawPresets"] as const,
      of: (isDeposit: boolean) => (isDeposit ? ["getDepositPresets"] as const : ["getWithdrawPresets"] as const),
    },
    item: {
      byId: (isDeposit: boolean, id: string | number) => (isDeposit ? ["getDeposit", id] as const : ["getWithdraw", id] as const),
    },
    // convenience callback returning both list and item helpers for a given mode
    of: (isDeposit: boolean) => ({
      list: isDeposit ? ["getDepositPresets"] as const : ["getWithdrawPresets"] as const,
      item: (id: string | number) => (isDeposit ? ["getDeposit", id] as const : ["getWithdraw", id] as const),
    }),
  },
};

export type QueryKeyLike = readonly unknown[];

export default QUERY_KEYS;
