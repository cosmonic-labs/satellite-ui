import {type OnChangeFn, type SortingState} from '@tanstack/react-table';
import * as React from 'react';
import {useUserPreference} from 'features/preferences';

type TableConfig = {
  sorting: SortingState;
};

type UseTableConfigResult = {
  setSorting: OnChangeFn<SortingState>;
} & TableConfig;

function useTableConfig(id: string, defaultValue: TableConfig): UseTableConfigResult {
  const [state, setState] = useUserPreference('config', 'tableConfig.' + id, defaultValue);
  const sorting = state.data.sorting ?? defaultValue.sorting;

  const setSorting: OnChangeFn<SortingState> = React.useCallback(
    (updaterOrValue) => {
      const sorting =
        typeof updaterOrValue === 'function' ? updaterOrValue(state.data.sorting) : updaterOrValue;
      setState({...state, sorting});
    },
    [setState, state],
  );

  return {
    sorting,
    setSorting,
  };
}

export {useTableConfig};
