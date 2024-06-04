const configQueryKeys = {
  all: ['configs'] as const,
  list: () => [...configQueryKeys.all, 'list'] as const,
  listExpanded: () => [...configQueryKeys.list(), 'expanded'] as const,
  detail: (name: string) => [...configQueryKeys.listExpanded(), name] as const,
};

export {configQueryKeys};
