import * as React from 'react';
import Icon from '@/_svg/provider.svg?react';

const ProviderIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (properties, reference) => <Icon {...properties} ref={reference} />,
);
ProviderIcon.displayName = 'ProviderIcon';

export {ProviderIcon};
