import {type PropsWithChildren} from 'react';

type FormSectionProperties = {
  readonly title: string | React.ReactElement;
  readonly description?: string | React.ReactElement;
};

function FormSection({
  title,
  description,
  children,
}: PropsWithChildren<FormSectionProperties>): React.ReactElement {
  return (
    <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 border-b border-border pb-12 last:border-b-0 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7">{title}</h2>
        <div className="mt-1 text-sm leading-6 text-muted-foreground">{description}</div>
      </div>

      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        {children}
      </div>
    </div>
  );
}

export {FormSection};
