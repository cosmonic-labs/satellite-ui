import {cva} from 'class-variance-authority';
import {CopyIcon, CheckCircleIcon} from 'lucide-react';
import * as React from 'react';
import {Button, type ButtonProps} from '@/components/button/index.js';
import {useCopyToClipboard} from '@/hooks/use-copy-to-clipboard.js';
import {cn} from '@/util/cn.js';

const iconSize = cva('', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-3.5 w-3.5',
      default: 'h-4 w-4',
      lg: 'h-4.5 w-4.5',
    } satisfies Record<NonNullable<ButtonProps['size']>, string>,
  },
});

type CopyButtonProperties = {
  readonly textToCopy: string;
  readonly size?: NonNullable<ButtonProps['size']>;
} & ButtonProps;

function CopyButton({
  textToCopy,
  size,
  className: buttonClassName,
  ...buttonProps
}: CopyButtonProperties): React.ReactElement {
  return (
    <CopyButtonPrimitive
      textToCopy={textToCopy}
      slots={{
        wrapper: ({className, ...props}) => (
          <Button className={cn(className, buttonClassName)} {...buttonProps} {...props} />
        ),
        copied: ({className, ...props}) => (
          <CheckCircleIcon className={cn(iconSize({size}), className)} {...props} />
        ),
        default: ({className, ...props}) => (
          <CopyIcon className={cn(iconSize({size}), className)} {...props} />
        ),
      }}
    />
  );
}

type CopyButtonPrimitiveProperties = React.PropsWithChildren<{
  readonly textToCopy: string;
  readonly slots?: {
    wrapper?: React.ElementType<React.ComponentProps<'button'>, 'button'>;
    copied?: React.ElementType<React.ComponentProps<'svg'>, 'svg'>;
    default?: React.ElementType<React.ComponentProps<'svg'>, 'svg'>;
  };
}>;

function CopyButtonPrimitive({
  textToCopy,
  slots,
  children,
  ...props
}: CopyButtonPrimitiveProperties) {
  const CopiedSlot = slots?.copied ?? CheckCircleIcon;
  const WrapperSlot = slots?.wrapper ?? 'button';
  const DefaultSlot = slots?.default ?? CopyIcon;

  const timeoutReference = React.useRef<number>();
  const [isCopied, setCopied] = React.useState(false);
  const copy = useCopyToClipboard();

  const handleCopy = React.useCallback(() => {
    clearTimeout(timeoutReference.current);
    copy(textToCopy)
      .then(() => {
        setCopied(true);
        timeoutReference.current = setTimeout(() => {
          setCopied(false);
        }, 2000) as unknown as number;
      })
      .catch(() => null);
  }, [copy, textToCopy]);

  return (
    <WrapperSlot onClick={handleCopy} {...props}>
      {isCopied ? <CopiedSlot className="size-3" /> : <DefaultSlot className="size-3" />}
      {children}
    </WrapperSlot>
  );
}

export {CopyButton, CopyButtonPrimitive};
