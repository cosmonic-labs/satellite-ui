const configQueryKeys = {
  all: ['configs'] as const,
  list: () => [...configQueryKeys.all, 'list'] as const,
  listExpanded: () => [...configQueryKeys.all, 'listExpanded'] as const,
  detail: (name: string) => [...configQueryKeys.list(), name] as const,
};

export {configQueryKeys};
