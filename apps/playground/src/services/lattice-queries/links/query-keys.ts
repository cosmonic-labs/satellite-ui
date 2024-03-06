const linkQueryKeys = {
  all: ['links'] as const,
  list: () => [...linkQueryKeys.all, 'list'] as const,
  listExpanded: () => [...linkQueryKeys.all, 'listExpanded'] as const,
  detail: (name: string) => [...linkQueryKeys.list(), name] as const,
};

export {linkQueryKeys};
