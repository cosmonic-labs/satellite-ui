import * as React from 'react';
import Icon from '@/_svg/logo-cosmonic.svg?react';

const LogoCosmonicIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (properties, reference) => <Icon {...properties} ref={reference} />,
);
LogoCosmonicIcon.displayName = 'LogoCosmonicIcon';

export {LogoCosmonicIcon};
