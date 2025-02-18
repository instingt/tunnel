import { createEffect, createEvent, createStore } from 'effector';

import { fetchData } from '../utils';
import { SettingsResponseType } from './types';
import { SETTINGS_URL } from './constants';

const initialSettings = null;
export const $settingsStore = createStore<SettingsResponseType | null>(initialSettings);

export const setSettings = createEvent<SettingsResponseType>();

export const getSettingsFx = createEffect<void, SettingsResponseType, Response>(
  () => fetchData(SETTINGS_URL).then((res) => res.json())
);

export const changeSettingsFx = createEffect<SettingsResponseType, SettingsResponseType, Response>(
  (newSettings) => fetchData(
    SETTINGS_URL,
    {
      method: 'PATCH',
      body: JSON.stringify(newSettings)
    }
  ).then((res) => res.json())
);
