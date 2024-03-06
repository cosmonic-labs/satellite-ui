import {screen, waitFor} from '@testing-library/react';
import user from '@testing-library/user-event';
import {constellationQueryMockSuccess} from 'features/constellation/api/__mocks__/useConstellationQuery.mocks';
import * as React from 'react';
import {Route, Routes, useParams, useSearchParams} from 'react-router-dom';
import {renderApp, server} from 'test';
import {
  getApplicationsMockEmpty,
  getApplicationsMockSuccess,
  getApplicationsMockSuccessUndeployed,
} from '../../../services/lattice-queries/applications/__mocks__/getApplications.mocks';
import {undeployApplicationMockSuccess} from '../../../services/lattice-queries/applications/__mocks__/undeployApplication.mocks';
import {ApplicationsTable} from './applications-table';

describe('<ApplicationsTable />', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('should render when empty response', () => {
    server.use(constellationQueryMockSuccess(true), getApplicationsMockEmpty());

    const {baseElement} = renderApp(<ApplicationsTable />, {
      wrapQueryClient: true,
      wrapRedux: true,
      wrapReactRouter: true,
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render when non-empty response', async () => {
    server.use(constellationQueryMockSuccess(true), getApplicationsMockSuccess());

    const {baseElement} = renderApp(<ApplicationsTable />, {
      wrapQueryClient: true,
      wrapRedux: true,
      wrapReactRouter: true,
    });

    await waitFor(() => screen.findByText('example-application-name'));
    expect(screen.getByText('example-application-name')).toHaveAttribute(
      'href',
      `/detail/example-application-name`,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should show deployed badge in status column when deployed', async () => {
    server.use(constellationQueryMockSuccess(true), getApplicationsMockSuccess());

    renderApp(<ApplicationsTable />, {
      wrapQueryClient: true,
      wrapRedux: true,
      wrapReactRouter: true,
    });

    await screen.findByText('READY');
  });

  it('should show correct items in dropdown', async () => {
    user.setup();

    server.use(constellationQueryMockSuccess(true), getApplicationsMockSuccess());

    renderApp(<ApplicationsTable />, {
      wrapQueryClient: true,
      wrapRedux: true,
      wrapReactRouter: true,
    });

    await waitFor(() => screen.findByText('example-application-name'));

    await user.click(screen.getByTestId('actions-button'));
    screen.getByRole('menuitem', {name: 'Undeploy'});
    screen.getByRole('menuitem', {name: 'View Manifest Summary'});
    screen.getByRole('menuitem', {name: 'View Version History'});
  });

  it('should go to application page when using dropdown action', async () => {
    user.setup();

    server.use(
      constellationQueryMockSuccess(true),
      getApplicationsMockSuccess(),
      getApplicationsMockSuccessUndeployed(),
    );

    function TestRoute(): React.ReactElement {
      const {applicationId} = useParams();
      const [parameters] = useSearchParams();
      return (
        <div data-test-id="application-id-test-route">
          Test Route: {applicationId}/{parameters.get('view')}
        </div>
      );
    }

    renderApp(
      <Routes>
        <Route path="/constellation/applications" element={<ApplicationsTable />} />
        <Route path="/constellation/applications/detail/:applicationId" element={<TestRoute />} />
      </Routes>,
      {
        routerProps: {initialEntries: ['/constellation/applications']},
        wrapQueryClient: true,
        wrapRedux: true,
        wrapReactRouter: true,
      },
    );

    await waitFor(() => screen.findByText('example-application-name'));

    await user.click(screen.getByTestId('actions-button'));
    await user.click(screen.getByRole('menuitem', {name: 'View Manifest Summary'}));

    await waitFor(() => screen.findByText('Test Route: example-application-name/manifest'));
  });

  it('should undeploy application when using dropdown item', async () => {
    user.setup();

    server.use(
      constellationQueryMockSuccess(true),
      getApplicationsMockSuccess(),
      undeployApplicationMockSuccess(),
      getApplicationsMockSuccessUndeployed(),
    );

    renderApp(<ApplicationsTable />, {
      wrapQueryClient: true,
      wrapRedux: true,
      wrapReactRouter: true,
    });

    await waitFor(() => screen.findByText('example-application-name'));

    await user.click(screen.getByTestId('actions-button'));
    await user.click(screen.getByRole('menuitem', {name: 'Undeploy'}));

    await waitFor(() => expect(screen.queryByText('Deployed')).not.toBeInTheDocument());
    await user.click(screen.getByTestId('actions-button'));
    screen.getByRole('menuitem', {name: 'Deploy'});
  });
});
