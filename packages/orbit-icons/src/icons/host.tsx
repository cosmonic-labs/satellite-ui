import * as React from 'react';
import Icon from '@/_svg/host.svg?react';

const HostIcon = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  (properties, reference) => <Icon {...properties} ref={reference} />,
);
HostIcon.displayName = 'HostIcon';

export {HostIcon};
