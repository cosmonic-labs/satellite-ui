import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(links)/links')({
  component: () => <div>Hello /(links)/links!</div>,
});
