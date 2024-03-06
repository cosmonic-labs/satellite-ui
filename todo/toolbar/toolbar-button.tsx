import {type ComponentPropsWithRef, forwardRef} from 'react';
import Icon from 'components/Shared/Icon/Icon';

type ToolbarButtonProperties = {
  name: string;
  glow?: boolean;
  icon?: JSX.Element;
} & ComponentPropsWithRef<'button'>;

function ToolbarButton({
  glow = false,
  className,
  icon,
  name,
  ref,
  ...buttonProperties
}: ToolbarButtonProperties): JSX.Element {
  const buttonClasses = [
    'flex cursor-pointer flex-col items-center rounded-lg px-8 duration-100 text-spaceBlue',
    'dark:text-white',
    className ?? undefined,
    glow && 'animate-pulse-glow',
  ].join(' ');

  const displayIcon = icon ?? <Icon iconName="icon-activity-log" />;

  return (
    <button ref={ref} className={buttonClasses} {...buttonProperties}>
      <div className="flex h-7 w-7 items-center justify-center">{displayIcon}</div>
      <div className="select-none text-xs font-semibold">{name}</div>
    </button>
  );
}

export default forwardRef<HTMLButtonElement, Omit<ToolbarButtonProperties, 'ref'>>(
  (properties, reference) => <ToolbarButton ref={reference} {...properties} />,
);
