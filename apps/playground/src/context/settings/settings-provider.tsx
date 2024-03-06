import React, {useReducer, type PropsWithChildren} from 'react';
import {type Action, type State, initialState, settingsContext} from '@/context/settings';

function SettingsProvider({children}: PropsWithChildren) {
  const value = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'setTheme': {
        return {...state, theme: action.payload};
      }

      case 'toggleSidebar': {
        return {...state, sidebarOpen: !state.sidebarOpen};
      }
    }
  }, initialState);

  return <settingsContext.Provider value={value}>{children}</settingsContext.Provider>;
}

export {SettingsProvider};
