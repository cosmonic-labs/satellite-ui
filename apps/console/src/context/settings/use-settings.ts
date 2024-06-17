import * as React from 'react';
import {settingsContext} from '@/context/settings';

function useSettings() {
  return React.useContext(settingsContext);
}

type SettingsProviderResult<Type = typeof settingsContext> =
  Type extends React.Context<infer X> ? X : never;

type SettingsContext = SettingsProviderResult[0];
type SettingsUpdater = SettingsProviderResult[1];
type SettingsKey = keyof SettingsContext;

function useSetting(name: SettingsKey) {
  const [settings] = useSettings();
  const setting = settings[name];
  return setting;
}

export {useSettings, useSetting};
