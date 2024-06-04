import {Button} from '@cosmonic/orbit-ui';
import {Link, useNavigate, useRouter} from '@tanstack/react-router';
import {ChevronLeftIcon, ExternalLinkIcon} from 'lucide-react';
import * as React from 'react';
import TeriLostSvg from '@/assets/images/teri-lost.svg?react';
import {type PropsWithSlots} from '@/types/props-with-slots';

type SheetNotFoundSlots = {
  title: React.ElementType;
  copy: React.ElementType;
  actions: React.ElementType;
};
type SheetNotFoundProps = PropsWithSlots<SheetNotFoundSlots>;

function SheetNotFound(props: SheetNotFoundProps): React.ReactElement {
  const {history} = useRouter();
  const Title = props.slots?.title ?? (() => <>Not Found</>);
  const Copy =
    props.slots?.copy ??
    (() => (
      <>
        It seems what you are looking for doesn&rsquo;t exist. Maybe it was moved or you&rsquo;ve
        got an old URL saved? Either way, it&rsquo;s not here
      </>
    ));
  const Actions =
    props.slots?.actions ??
    (() => (
      <>
        <Button asChild size="sm">
          <a href="https://wasmcloud.com/docs/" target="_blank" rel="noopener">
            View the Docs <ExternalLinkIcon size="16" className="ms-2" />
          </a>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            history.back();
          }}
        >
          <ChevronLeftIcon size="16" /> Back
        </Button>
      </>
    ));

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-cosmo-blue dark:text-cosmo-blue-100">
            <Title />
          </h2>
          <p className="text-sm">
            <Copy />
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Actions />
        </div>
      </div>
      <div className="mt-8">
        <TeriLostSvg className="h-auto w-full min-w-[150px] max-w-[350px] -scale-x-100" />
      </div>
    </div>
  );
}

export {SheetNotFound};
