// Centralized routes for the app. Use callbacks for id-based paths and helpers.
export const ROUTES = {
  home: { name: 'home', path: '/home' },
  balance: { name: 'balance', path: '/balance' },

  actions: {
    deposits: {
      name: 'deposits',
      path: '/actions/deposits',
      add: '/actions/deposits/add',
      item: (id?: number) => (id ? `/actions/deposits/${id}` : `/actions/deposits`),
    },
    withdraws: {
      name: 'withdraws',
      path: '/actions/withdraws',
      add: '/actions/withdraws/add',
      item: (id?: number) => (id ? `/actions/withdraws/${id}` : `/actions/withdraws`),
    },
    // convenience callbacks to avoid ternaries throughout the codebase
    of: {
      add: (isDeposit: boolean) => (isDeposit ? '/actions/deposits/add' : '/actions/withdraws/add'),
      item: (isDeposit: boolean, id?: number) => (isDeposit ? (id ? `/actions/deposits/${id}` : '/actions/deposits') : (id ? `/actions/withdraws/${id}` : '/actions/withdraws')),
      path: (isDeposit: boolean) => (isDeposit ? '/actions/deposits' : '/actions/withdraws'),
    },
  },

  presets: {
    deposits: {
      name: 'presets-deposits',
      path: '/presets/deposits',
      add: '/presets/deposits/add',
      edit: (id?: number) => (id ? `/presets/deposits/${id}/edit` : `/presets/deposits`),
      item: (id?: number) => (id ? `/presets/deposits/${id}` : `/presets/deposits`),
    },
    withdraws: {
      name: 'presets-withdraws',
      path: '/presets/withdraws',
      add: '/presets/withdraws/add',
      item: (id?: number) => (id ? `/presets/withdraws/${id}` : `/presets/withdraws`),
      edit: (id?: number) => (id ? `/presets/withdraws/${id}/edit` : `/presets/withdraws`)
    },
    of: {
      add: (isDeposit: boolean) => (isDeposit ? '/presets/deposits/add' : '/presets/withdraws/add'),
      item: (isDeposit: boolean, id?: number) => (isDeposit ? (id ? `/presets/deposits/${id}` : '/presets/deposits') : (id ? `/presets/withdraws/${id}` : '/presets/withdraws')),
      edit: (isDeposit: boolean, id?: number) => (isDeposit ? (id ? `/presets/deposits/${id}/edit` : '/presets/deposits') : (id ? `/presets/withdraws/${id}/edit` : '/presets/withdraws')),
      path: (isDeposit: boolean) => (isDeposit ? '/presets/deposits' : '/presets/withdraws'),
    },
  },
} as const;

export type Routes = typeof ROUTES;

export default ROUTES;
