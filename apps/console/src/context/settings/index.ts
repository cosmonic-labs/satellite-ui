import * as React from 'react';

const initialState = {
  theme: 'light',
  sidebarOpen: true,
};

type State = typeof initialState;

type Action = {type: 'setTheme'; payload: State['theme']} | {type: 'toggleSidebar'};

type Updater = React.Dispatch<Action>;

type SettingsProviderValue = [State, Updater];

const settingsContext = React.createContext<SettingsProviderValue>([
  initialState,
  () => {
    throw new Error('No settings provider');
  },
]);

export {
  settingsContext,
  initialState,
  type State,
  type Action,
  type Updater,
  type SettingsProviderValue,
};
