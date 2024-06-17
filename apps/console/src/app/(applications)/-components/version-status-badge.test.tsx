import {screen} from '@testing-library/react';
import {DeploymentStatus} from 'shared/graphql-codegen/graphql';
import {renderApp} from 'test';
import {VersionStatusBadge} from './version-status-badge';

describe('<VersionStatusBadge />', () => {
  it('should render with data', () => {
    const view = renderApp(<VersionStatusBadge status={DeploymentStatus.Ready} version="1.0.0" />);

    screen.getByText('1.0.0');
    screen.getByText('READY');

    expect(view.container).toMatchSnapshot();
  });

  it('should show other statuses', () => {
    const {rerender} = renderApp(
      <VersionStatusBadge status={DeploymentStatus.Failed} version="1.0.0" />,
    );

    screen.getByText('FAILED');
    screen.getByText('1.0.0');

    rerender(<VersionStatusBadge status={DeploymentStatus.Undeployed} version="2.0.0" />);

    screen.getByText('UNDEPLOYED');
    screen.getByText('2.0.0');

    rerender(<VersionStatusBadge status={DeploymentStatus.Unknown} version="3.0.0" />);

    screen.getByText('UNKNOWN');
    screen.getByText('3.0.0');

    rerender(<VersionStatusBadge status={DeploymentStatus.Reconciling} version="4.0.0" />);

    screen.getByText('RECONCILING');
    screen.getByText('4.0.0');
  });
});
