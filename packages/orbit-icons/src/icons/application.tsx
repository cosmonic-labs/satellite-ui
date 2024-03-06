import * as React from 'react';
import Icon from '@/_svg/application.svg?react';

const AppIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (properties, reference) => <Icon {...properties} ref={reference} />,
);
AppIcon.displayName = 'ApplicationIcon';

export {AppIcon as ApplicationIcon};
