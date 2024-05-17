import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/(configs)/configs')({
  component: () => <div>Hello /(configs)/configs!</div>,
});
