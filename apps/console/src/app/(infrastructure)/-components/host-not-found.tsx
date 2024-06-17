import {Button} from '@cosmonic/orbit-ui';
import {Link} from '@tanstack/react-router';
import {ChevronLeftIcon, ExternalLinkIcon} from 'lucide-react';
import * as React from 'react';
import TeriLostSvg from '@/assets/images/teri-lost.svg?react';

function HostNotFound({id}: {readonly id?: string}): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-cosmo-blue dark:text-cosmo-blue-100">
            It looks like the host with id starting with <code>{id?.slice(0, 8)}</code>{' '}
            doesn&rsquo;t exist!
          </h2>
          <p className="text-sm">
            Maybe it was stopped. Maybe <i>someone</i> mistyped the URL. Maybe it&rsquo;s just a
            figment of your imagination. Maybe it&rsquo;s a ghost host. 👻
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <a
              href="https://wasmcloud.com/docs/tour/hello-world#start-the-wasmcloud-host"
              target="_blank"
              rel="noopener"
            >
              {/* TODO: show modal with wash instructions instead of docs link */}
              Start a new Host <ExternalLinkIcon size="16" className="ms-2" />
            </a>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link to="/infrastructure/hosts">
              <ChevronLeftIcon size="16" /> All Hosts
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <TeriLostSvg className="h-auto w-full min-w-[150px] max-w-[350px] -scale-x-100" />
      </div>
    </div>
  );
}

export {HostNotFound};
