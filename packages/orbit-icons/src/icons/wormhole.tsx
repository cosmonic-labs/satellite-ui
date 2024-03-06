import * as React from 'react';
import SvgWormholeClosedPrivate from '@/_svg/wormhole-closed-private.svg?react';
import SvgWormholeClosedPublic from '@/_svg/wormhole-closed-public.svg?react';
import SvgWormholeOpenPrivate from '@/_svg/wormhole-open-private.svg?react';
import SvgWormholeOpenPublic from '@/_svg/wormhole-open-public.svg?react';

type WormholeProperties = {
  readonly isOpen?: boolean;
  readonly isPrivate?: boolean;
} & React.SVGProps<SVGSVGElement>;

function WormholeIcon({
  isOpen = true,
  isPrivate = false,
  ...properties
}: WormholeProperties): JSX.Element {
  if (isOpen) {
    if (isPrivate) {
      return <SvgWormholeOpenPrivate {...properties} />;
    }

    return <SvgWormholeOpenPublic {...properties} />;
  }

  if (isPrivate) {
    return <SvgWormholeClosedPrivate {...properties} />;
  }

  return <SvgWormholeClosedPublic {...properties} />;
}

export {WormholeIcon};
