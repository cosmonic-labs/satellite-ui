import {createFileRoute, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/(infrastructure)/infrastructure')({
  beforeLoad({location}) {
    if (location.pathname === '/infrastructure') {
      throw redirect({to: '/infrastructure/hosts', statusCode: 301});
    }
  },
});
