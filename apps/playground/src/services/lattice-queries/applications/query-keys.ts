const applicationQueryKeys = {
  all: ['applications'] as const,
  list: () => [...applicationQueryKeys.all, 'list'] as const,
  detail: (name: string) => [...applicationQueryKeys.all, {name, view: 'detail'}] as const,
  versions: (name: string) => [...applicationQueryKeys.all, {name, view: 'versions'}] as const,
  manifest: (name: string, version?: string) =>
    [...applicationQueryKeys.all, {name, view: 'manifest', version}] as const,
};

export {applicationQueryKeys};
