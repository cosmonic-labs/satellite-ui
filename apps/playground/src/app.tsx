import '@/styles/index.css';
import {RouterProvider, createRouter} from '@tanstack/react-router';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {latticeClients} from './context/lattice-client/index.js';
import {routeTree} from './route-tree.gen.js';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    title: '',
    latticeClient: 'default',
    latticeClients,
    getClient: ({latticeClient, latticeClients}) => latticeClients.getClient(latticeClient),
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- This is a type extension
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.querySelector('#app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
