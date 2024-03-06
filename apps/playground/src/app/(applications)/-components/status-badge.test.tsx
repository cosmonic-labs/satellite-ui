import {screen} from '@testing-library/react';
import {DeploymentStatus} from 'shared/graphql-codegen/graphql';
import {renderApp} from 'test';
import {StatusBadge} from './status-badge';

describe('<StatusBadge />', () => {
  it('should render with data', () => {
    const view = renderApp(<StatusBadge status={DeploymentStatus.Ready} />);

    screen.getByText('READY');

    expect(view.container).toMatchSnapshot();
  });

  it('should show other statuses', () => {
    const {rerender} = renderApp(<StatusBadge status={DeploymentStatus.Failed} />);

    screen.getByText('FAILED');

    rerender(<StatusBadge status={DeploymentStatus.Undeployed} />);

    screen.getByText('UNDEPLOYED');

    rerender(<StatusBadge status={DeploymentStatus.Unknown} />);

    screen.getByText('UNKNOWN');

    rerender(<StatusBadge status={DeploymentStatus.Reconciling} />);

    screen.getByText('RECONCILING');
  });
});
