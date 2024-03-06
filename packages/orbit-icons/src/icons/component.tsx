import * as React from 'react';
import Icon from '@/_svg/component.svg?react';

const ComponentIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (properties, reference) => <Icon {...properties} ref={reference} />,
);
ComponentIcon.displayName = 'ComponentIcon';

export {ComponentIcon};
