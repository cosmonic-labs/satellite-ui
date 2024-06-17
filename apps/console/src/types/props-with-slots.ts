type PropsWithSlots<
  C extends Partial<Record<string, React.ElementType>>,
  P = Record<string, unknown>,
> = P & {
  slots?: C;
};

export type {PropsWithSlots};
