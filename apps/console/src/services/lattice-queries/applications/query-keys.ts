const applicationQueryKeys = {
  all: ['applications'] as const,
  list: () => [...applicationQueryKeys.all, 'list'] as const,
  detail: (name: string) => [...applicationQueryKeys.all, 'detail', name] as const,
  versions: (name: string) => [...applicationQueryKeys.detail(name), 'versions'] as const,
  status: (name: string) => [...applicationQueryKeys.detail(name), 'status'] as const,
  manifest: (name: string, version?: string) =>
    [...applicationQueryKeys.detail(name), 'manifest', version] as const,
};

export {applicationQueryKeys};
