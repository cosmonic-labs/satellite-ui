import {type ComponentPropsWithoutRef, type ElementType, type PropsWithChildren} from 'react';
import {cn} from '@/util/cn.js';

type PageHeaderProperties<E extends ElementType = ElementType> = {
  readonly title: JSX.Element | string;
  readonly right?: JSX.Element;
  readonly tag?: E;
  readonly className?: string;
} & ComponentPropsWithoutRef<E>;

const defaultTag: ElementType = 'h1';

function PageHeader<E extends ElementType = typeof defaultTag>({
  children,
  title,
  tag,
  right,
  className,
  ...tagProperties
}: PropsWithChildren<PageHeaderProperties<E>>): JSX.Element {
  const HeaderElement = tag ?? defaultTag;

  return (
    <div className="my-12">
      <div className={cn('flex justify-between', className)}>
        <HeaderElement {...tagProperties} className="text-xl font-semibold md:text-3xl">
          {title}
        </HeaderElement>
        {right && <div className="flex flex-col items-center">{right}</div>}
      </div>
      {children && <div className="mt-2 text-sm">{children}</div>}
    </div>
  );
}

export {PageHeader};
