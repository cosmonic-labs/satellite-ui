import {Button} from '@cosmonic/orbit-ui';
import {Link} from '@tanstack/react-router';
import {ChevronLeftIcon} from 'lucide-react';
import * as React from 'react';
import TeriLostSvg from '@/assets/images/teri-lost.svg?react';
import {Container} from '@/components/container';

function AppNotFound({name}: {readonly name?: string}): React.ReactElement {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center md:flex-row">
        <div className="w-full md:w-1/2 md:max-w-sm">
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-cosmo-blue dark:text-cosmo-blue-100">
              It looks like the application <code>{name}</code> doesn&rsquo;t exist!
            </h2>
            <p className="text-sm">
              Maybe it was deleted. Maybe it hasn&rsquo;t been created yet. Maybe it fell into a
              black hole and is the harbinger of the end of the universe. I should call mom.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link to="/applications/new">New Application</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link to="/applications">
                <ChevronLeftIcon size="16" /> All Applications
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <TeriLostSvg className="h-auto w-full min-w-[150px] max-w-[350px] -scale-x-100" />
        </div>
      </div>
    </Container>
  );
}

export {AppNotFound};
