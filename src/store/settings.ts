import { Action } from 'redux';

export interface SettingsState {
    showSettings: boolean;
}

export enum SettingsActions {
    TOGGLE_SHOW_SETTINGS = 'SETTINGS/TOGGLE_SHOW_SETTINGS',
}

export interface ToggleShowSettingsAction extends Action<SettingsActions.TOGGLE_SHOW_SETTINGS> {
    type: SettingsActions.TOGGLE_SHOW_SETTINGS;
}

export type SettingsActionType =
    ToggleShowSettingsAction;

export const toggleShowSettings = () => ({
    type: SettingsActions.TOGGLE_SHOW_SETTINGS,
});

const INITIAL_STATE: SettingsState = {
    showSettings: false,
};

export const settingsState = (
    state: SettingsState = INITIAL_STATE, // defaultSearchConfig,
    action: SettingsActionType
): SettingsState => {
    switch (action.type) {

        case SettingsActions.TOGGLE_SHOW_SETTINGS:
            return {
                ...state,
                showSettings: !state.showSettings
            };

        default:
            return state;
    }
};
