import {screen} from '@testing-library/react';
import {renderApp} from '@/test';
import {describe, it, expect} from 'vitest';
import {StatusBadge} from './status-badge';

describe('<StatusBadge />', () => {
  it('should render with data', () => {
    const view = renderApp(<StatusBadge status={'deployed'} />);

    screen.getByText('DEPLOYED');

    expect(view.container).toMatchSnapshot();
  });

  it('should show other statuses', () => {
    const {rerender} = renderApp(<StatusBadge status={'failed'} />);

    screen.getByText('FAILED');

    rerender(<StatusBadge status={'undeployed'} />);

    screen.getByText('UNDEPLOYED');

    rerender(<StatusBadge status={'unknown'} />);

    screen.getByText('UNKNOWN');

    rerender(<StatusBadge status={'reconciling'} />);

    screen.getByText('RECONCILING');
  });
});
