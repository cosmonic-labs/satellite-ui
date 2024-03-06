import {act, waitFor} from '@testing-library/react';
import {getUserPreferenceMockSuccess} from 'features/preferences/api/__mocks__/getPreferenceQuery.mocks';
import {setPreferenceMutationMockSuccess} from 'features/preferences/api/__mocks__/setPreferenceMutation.mocks';
import {server} from 'test';
import {renderAppHook} from 'test/render-app';
import {useTableConfig} from './use-table-config.js';

describe('useTableConfig()', () => {
  it('should return a record with data and update function', async () => {
    server.use(
      getUserPreferenceMockSuccess({
        namespace: 'user',
        resourceId: 'isAwesome',
        data: false,
      }),
    );

    const {result} = renderAppHook(
      () =>
        useTableConfig('testTable', {
          sorting: [{id: 'test', desc: false}],
        }),
      {
        wrapQueryClient: true,
      },
    );

    expect(result.current).toStrictEqual(
      expect.objectContaining({
        sorting: [{id: 'test', desc: false}],
        setSorting: expect.any(Function),
      }),
    );
  });

  it('should update the sorting state when setSorting is called', async () => {
    server.use(
      getUserPreferenceMockSuccess({
        namespace: 'user',
        resourceId: 'isAwesome',
        data: false,
      }),
      setPreferenceMutationMockSuccess(),
    );

    const {result} = renderAppHook(
      () => useTableConfig('testTable', {sorting: [{id: 'test', desc: false}]}),
      {wrapQueryClient: true},
    );

    expect(result.current.sorting).toStrictEqual([{id: 'test', desc: false}]);

    act(() => {
      result.current.setSorting([{id: 'different', desc: true}]);
    });

    await waitFor(() => {
      expect(result.current.sorting).toStrictEqual([{id: 'different', desc: true}]);
    });
  });
});
