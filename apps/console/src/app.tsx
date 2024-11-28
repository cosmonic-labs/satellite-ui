import '@/styles/index.css';
import {ErrorComponent, RouterProvider, createRouter} from '@tanstack/react-router';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {initAppMeta} from '@/helpers/app-metadata';
import {routeTree} from '@/route-tree.gen';

initAppMeta();

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultErrorComponent: ErrorComponent,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- This is a type extension
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.querySelector('#root');
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
