import '@testing-library/jest-dom/vitest';
import {configure} from '@testing-library/react';
import {afterAll, afterEach, beforeAll, beforeEach, vi} from 'vitest';
import {server} from '@/test/server';

beforeAll(() => {
  // Establish API mocking before all tests. Fail if there is a request that isn't mocked.
  server.listen({onUnhandledRequest: 'warn'});
});

beforeEach(() => {
  // mock window.location
  Object.defineProperty(window, 'location', {
    value: {assign: vi.fn(), replace: vi.fn(), reload: vi.fn()},
    configurable: true,
    enumerable: true,
    writable: true,
  });
});

afterEach(() => {
  // Reset any request handlers that we may add during the tests,  so they don't affect other tests.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up after the tests are finished.
  server.close();
});

configure({
  testIdAttribute: 'data-testid',
});
