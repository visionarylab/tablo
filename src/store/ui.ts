import { Action } from 'redux';

export interface UIState {
    showSettings: boolean;
    showBookmarks: boolean;
    showDetails: boolean;
    showHistory: boolean;
    theme: 'dark' | 'light';
    textColor: string;
    backgroundColor: string;
}

export enum UIActions {
    OPEN_SETTINGS_SIDEBAR = 'UI/OPEN_SETTINGS_SIDEBAR',
    OPEN_BOOKMARKS_SIDEBAR = 'UI/OPEN_BOOKMARKS_SIDEBAR',
    OPEN_DETAILS_SIDEBAR = 'UI/OPEN_DETAILS_SIDEBAR',
    OPEN_HISTORY_SIDEBAR = 'UI/OPEN_HISTORY_SIDEBAR',
    CLOSE_ALL_SIDEBAR = 'UI/CLOSE_ALL_SIDEBAR',
    SET_THEME = 'UI/SET_THEME',
}

export interface OpenSettingsAction extends Action<UIActions.OPEN_SETTINGS_SIDEBAR> {
    type: UIActions.OPEN_SETTINGS_SIDEBAR;
}

export interface OpenBookmarksAction extends Action<UIActions.OPEN_BOOKMARKS_SIDEBAR> {
    type: UIActions.OPEN_BOOKMARKS_SIDEBAR;
}

export interface OpenDetailsAction extends Action<UIActions.OPEN_DETAILS_SIDEBAR> {
    type: UIActions.OPEN_DETAILS_SIDEBAR;
}

export interface OpenHistoryAction extends Action<UIActions.OPEN_HISTORY_SIDEBAR> {
    type: UIActions.OPEN_HISTORY_SIDEBAR;
}

export interface CloseAllAction extends Action<UIActions.CLOSE_ALL_SIDEBAR> {
    type: UIActions.CLOSE_ALL_SIDEBAR;
}

export interface SetThemeAction extends Action<UIActions.SET_THEME> {
    type: UIActions.SET_THEME;
    payload: 'dark' | 'light';
}

export type UIActionType = OpenSettingsAction
                         | OpenBookmarksAction
                         | OpenDetailsAction
                         | OpenHistoryAction
                         | CloseAllAction
                         | SetThemeAction;

export const openSettingsSidebar = () => ({
    type: UIActions.OPEN_SETTINGS_SIDEBAR,
});

export const openBookmarksSidebar = () => ({
    type: UIActions.OPEN_BOOKMARKS_SIDEBAR,
});

export const openDetailsSidebar = () => ({
    type: UIActions.OPEN_DETAILS_SIDEBAR,
});

export const openHistorySidebar = () => ({
    type: UIActions.OPEN_HISTORY_SIDEBAR,
});


export const closeAllSidebarSidebar = () => ({
    type: UIActions.CLOSE_ALL_SIDEBAR,
});

export const setTheme = (payload: 'dark' | 'light') => ({
    type: UIActions.SET_THEME,
    payload: payload
});

const INITIAL_STATE: UIState = {
    showSettings: false,
    showBookmarks: false,
    showDetails: false,
    showHistory: false,
    theme: 'dark',
    textColor: 'white',
    backgroundColor: '#282c34',
};

export const uiState = (
    state: UIState = INITIAL_STATE, // defaultSearchConfig,
    action: UIActionType
): UIState => {
    switch (action.type) {

        case UIActions.OPEN_SETTINGS_SIDEBAR:
            return {
                ...state,
                showSettings: !state.showSettings,
                showBookmarks: false,
                showDetails: false,
                showHistory: false,
            };

        case UIActions.OPEN_BOOKMARKS_SIDEBAR:
            return {
                ...state,
                showSettings: false,
                showBookmarks: !state.showBookmarks,
                showDetails: false,
                showHistory: false,
            };

        case UIActions.OPEN_DETAILS_SIDEBAR:
            return {
                ...state,
                showSettings: false,
                showBookmarks: false,
                showDetails: !state.showDetails,
                showHistory: false,
            };

        case UIActions.OPEN_HISTORY_SIDEBAR:
            return {
                ...state,
                showSettings: false,
                showBookmarks: false,
                showDetails: false,
                showHistory: !state.showHistory,
            };

        case UIActions.CLOSE_ALL_SIDEBAR:
            return {
                ...state,
                showSettings: false,
                showBookmarks: false,
                showDetails: false,
                showHistory: false,
            };

        case UIActions.SET_THEME:
            return {
                ...state,
                theme: action.payload
            }


        default:
            return state;
    }
};
