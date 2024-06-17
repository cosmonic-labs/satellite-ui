const hostQueryKeys = {
  all: ['hosts'] as const,
  list: () => [...hostQueryKeys.all, 'list'] as const,
  listExpanded: () => [...hostQueryKeys.all, 'listExpanded'] as const,
  detail: (id: string) => [...hostQueryKeys.list(), id] as const,
};

export {hostQueryKeys};
