// Centralized business functions mapping to avoid inline isDeposit/isWithdraw ternaries.
// Consumers can call helpers like:
//   BUSINESS_FN.transactions.list.of(isDeposit)()
//   BUSINESS_FN.transactions.item.byId(isDeposit)(id)
//   BUSINESS_FN.transactions.create.of(isDeposit)(payload)

import {
  createDeposit,
  deleteDeposit,
  findDepositByID,
  getAllDeposits,
} from '@/backend/business-layer/transactions/Deposit';

import {
  createWithdraw,
  deleteWithdraw,
  findWithdrawByID,
  getAllWithdraws,
} from '@/backend/business-layer/transactions/Withdraw';

import {
  createDepositPreset,
  deleteDepositPreset,
  findDepositPreset,
  getAllDepositPresets,
} from '@/backend/business-layer/presets/deposits';

import {
  createWithdrawPreset,
  deleteWithdrawPreset,
  findWithdrawPreset,
  getAllWithdrawPresets,
} from '@/backend/business-layer/presets/withdraws';

import { getTotalLBPBalance, getTotalUSDBalance } from '@/backend/business-layer/transactions/balance';

export const BUSINESS_FN = {
  transactions: {
    list: {
      deposits: getAllDeposits,
      withdraws: getAllWithdraws,
      of: (isDeposit: boolean) => (isDeposit ? getAllDeposits : getAllWithdraws),
    },
    item: {
      byId: (isDeposit: boolean) => (isDeposit ? findDepositByID : findWithdrawByID),
    },
    create: {
      of: (isDeposit: boolean) => (isDeposit ? createDeposit : createWithdraw),
    },
    delete: {
      of: (isDeposit: boolean) => (isDeposit ? deleteDeposit : deleteWithdraw),
    },
  },

  presets: {
    list: {
      deposits: getAllDepositPresets,
      withdraws: getAllWithdrawPresets,
      of: (isDeposit: boolean) => (isDeposit ? getAllDepositPresets : getAllWithdrawPresets),
    },
    item: {
      byId: (isDeposit: boolean) => (isDeposit ? findDepositPreset : findWithdrawPreset),
    },
    create: {
      of: (isDeposit: boolean) => (isDeposit ? createDepositPreset : createWithdrawPreset),
    },
    delete: {
      of: (isDeposit: boolean) => (isDeposit ? deleteDepositPreset : deleteWithdrawPreset),
    },
  },

  balances: {
    usd: getTotalUSDBalance,
    lbp: getTotalLBPBalance,
  },
} as const;

export type BusinessFn = typeof BUSINESS_FN;

export default BUSINESS_FN;
