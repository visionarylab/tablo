import { Action } from 'redux';

export interface UIState {
    showSettings: boolean;
    showBookmarks: boolean;
    showDetails: boolean;
    showHistory: boolean;
    showEdit: boolean;
    theme: ThemeType;
    openLink: OpenLinkType;
}

export enum ThemeType {
    DARK = 'dark',
    LIGHT = 'light',
}

export enum OpenLinkType {
    CURRENT = 'current',
    NEW = 'NEW',
}

export enum UIActions {
    TOGGLE_SETTINGS = 'UI/TOGGLE_SETTINGS',
    TOGGLE_BOOKMARKS = 'UI/TOGGLE_BOOKMARKS',
    TOGGLE_DETAILS = 'UI/TOGGLE_DETAILS',
    TOGGLE_HISTORY = 'UI/TOGGLE_HISTORY',
    TOGGLE_EDIT = 'UI/TOGGLE_EDIT',
    CLOSE_ALL = 'UI/CLOSE_ALL',
    SET_THEME = 'UI/SET_THEME',
    SET_OPEN_LINK = 'UI/SET_OPEN_LINK',
}

export const theme = {
    dark: {
        color: 'white',
        bgColor: '#282c34',
        bgColorPanel: 'rgba(0, 0, 0, 0.2)',
        bgColorHover: 'rgba(255, 255, 255, 0.1)',
    },
    light: {
        color: '#222831',
        bgColor: '#F0ECE2',
        bgColorPanel: 'rgba(0, 0, 0, 0.2)',
        bgColorHover: 'rgba(0, 0, 0, 0.1)',
    }
}

export interface ToggleSettingsAction extends Action<UIActions.TOGGLE_SETTINGS> {
    type: UIActions.TOGGLE_SETTINGS;
}

export interface ToggleBookmarksAction extends Action<UIActions.TOGGLE_BOOKMARKS> {
    type: UIActions.TOGGLE_BOOKMARKS;
}

export interface ToggleDetailsAction extends Action<UIActions.TOGGLE_DETAILS> {
    type: UIActions.TOGGLE_DETAILS;
}

export interface ToggleHistoryAction extends Action<UIActions.TOGGLE_HISTORY> {
    type: UIActions.TOGGLE_HISTORY;
}

export interface ToggleEditAction extends Action<UIActions.TOGGLE_EDIT> {
    type: UIActions.TOGGLE_EDIT;
}

export interface CloseAllAction extends Action<UIActions.CLOSE_ALL> {
    type: UIActions.CLOSE_ALL;
}

export interface SetThemeAction extends Action<UIActions.SET_THEME> {
    type: UIActions.SET_THEME;
    payload: ThemeType;
}

export interface SetOpenLinkAction extends Action<UIActions.SET_OPEN_LINK> {
    type: UIActions.SET_OPEN_LINK;
    payload: OpenLinkType;
}

export type UIActionType = ToggleSettingsAction
                         | ToggleBookmarksAction
                         | ToggleDetailsAction
                         | ToggleHistoryAction
                         | ToggleEditAction
                         | CloseAllAction
                         | SetThemeAction
                         | SetOpenLinkAction;

export const toggleSettings = () => ({
    type: UIActions.TOGGLE_SETTINGS,
});

export const toggleBookmarks = () => ({
    type: UIActions.TOGGLE_BOOKMARKS,
});

export const toggleDetails= () => ({
    type: UIActions.TOGGLE_DETAILS,
});

export const toggleHistory = () => ({
    type: UIActions.TOGGLE_HISTORY,
});

export const toggleEdit = () => ({
    type: UIActions.TOGGLE_EDIT,
});

export const closeAll = () => ({
    type: UIActions.CLOSE_ALL,
});

export const setTheme = (payload: ThemeType) => ({
    type: UIActions.SET_THEME,
    payload: payload
});

export const setOpenLink = (payload: OpenLinkType) => ({
    type: UIActions.SET_OPEN_LINK,
    payload: payload
});

const INITIAL_STATE: UIState = {
    showSettings: false,
    showBookmarks: false,
    showDetails: false,
    showHistory: false,
    showEdit: false,
    theme: ThemeType.DARK,
    openLink: OpenLinkType.NEW,
};

export const uiState = (
    state: UIState = INITIAL_STATE, // defaultSearchConfig,
    action: UIActionType
): UIState => {
    switch (action.type) {

        case UIActions.TOGGLE_SETTINGS:
            return {
                ...state,
                showSettings: !state.showSettings,
                showBookmarks: false,
                showDetails: false,
                showHistory: false,
                showEdit: false,
            };

        case UIActions.TOGGLE_BOOKMARKS:
            return {
                ...state,
                showSettings: false,
                showBookmarks: !state.showBookmarks,
                showDetails: false,
                showHistory: false,
                showEdit: false,
            };

        case UIActions.TOGGLE_DETAILS:
            return {
                ...state,
                showSettings: false,
                showBookmarks: false,
                showDetails: !state.showDetails,
                showHistory: false,
                showEdit: false,
            };

        case UIActions.TOGGLE_HISTORY:
            return {
                ...state,
                showSettings: false,
                showBookmarks: false,
                showDetails: false,
                showHistory: !state.showHistory,
                showEdit: false,
            };

        case UIActions.TOGGLE_EDIT:
            return {
                ...state,
                showSettings: false,
                showBookmarks: false,
                showDetails: false,
                showHistory: false,
                showEdit: !state.showEdit,
            };

        case UIActions.CLOSE_ALL:
            return {
                ...state,
                showSettings: false,
                showBookmarks: false,
                showDetails: false,
                showHistory: false,
                showEdit: false,
            };

        case UIActions.SET_THEME:
            return {
                ...state,
                theme: action.payload
            }

        case UIActions.SET_OPEN_LINK:
            return {
                ...state,
                openLink: action.payload
            }

        default:
            return state;
    }
};
