import {screen} from '@testing-library/react';
import {renderApp} from '@/test';
import {describe, it, expect} from 'vitest';
import {VersionStatusBadge} from './version-status-badge';

describe('<VersionStatusBadge />', () => {
  it('should render with data', () => {
    const view = renderApp(<VersionStatusBadge status={'deployed'} version="1.0.0" />);

    screen.getByText('1.0.0');
    screen.getByText('READY');

    expect(view.container).toMatchSnapshot();
  });

  it('should show other statuses', () => {
    const {rerender} = renderApp(<VersionStatusBadge status={'failed'} version="1.0.0" />);

    screen.getByText('FAILED');
    screen.getByText('1.0.0');

    rerender(<VersionStatusBadge status={'undeployed'} version="2.0.0" />);

    screen.getByText('UNDEPLOYED');
    screen.getByText('2.0.0');

    rerender(<VersionStatusBadge status={'unknown'} version="3.0.0" />);

    screen.getByText('UNKNOWN');
    screen.getByText('3.0.0');

    rerender(<VersionStatusBadge status={'reconciling'} version="4.0.0" />);

    screen.getByText('RECONCILING');
    screen.getByText('4.0.0');
  });
});
