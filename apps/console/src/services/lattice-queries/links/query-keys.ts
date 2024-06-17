const linkQueryKeys = {
  all: ['links'] as const,
  list: () => [...linkQueryKeys.all, 'list'] as const,
};

export {linkQueryKeys};
