import * as React from 'react';
import Icon from '@/_svg/link.svg?react';

const LinkIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (properties, reference) => <Icon {...properties} ref={reference} />,
);
LinkIcon.displayName = 'LinkIcon';

export {LinkIcon};
