type PropsWithSlots<C extends Partial<Record<string, React.ElementType>>, P> = P & {
  slots?: C;
};

export type {PropsWithSlots};
