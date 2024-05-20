import {Button, GlossaryLink} from '@cosmonic/orbit-ui';
import {Link} from '@tanstack/react-router';
import * as React from 'react';
import TeriReadingSvg from '@/assets/images/teri-reading.svg?react';

function ApplicationsEmptyState(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <div className="w-full md:w-1/2 md:max-w-sm">
        <div className="mb-8 px-3">
          <h2 className="mb-4 text-lg font-semibold text-cosmo-blue dark:text-cosmo-blue-100">
            Launch your first application!
          </h2>
          <div className="mb-8 text-sm [&>*]:mb-4">
            <p>
              <GlossaryLink term="Application">Applications</GlossaryLink> managed by{' '}
              <code>wadm</code> will show up here. Create a new app by clicking the button below.
            </p>
            <p>
              Applications provide a way to manage, scale and version your deployments. For more
              information,{' '}
              <a
                href="https://wasmcloud.com/docs/fundamentals/wadm/model"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                check out the documentation
              </a>
              .
            </p>
          </div>
          <Button asChild size="sm">
            {/* // TODO: change back to /applications/new/template once the templates have been updated */}
            <Link to="/applications/new">New Application</Link>
          </Button>
        </div>
      </div>
      <div className="mt-8 md:mt-0">
        <TeriReadingSvg className="h-auto w-full min-w-[150px] max-w-[350px]" />
      </div>
    </div>
  );
}

export {ApplicationsEmptyState};
