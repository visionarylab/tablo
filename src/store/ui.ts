import { Action } from 'redux';

export interface UIState {
    showSettings: boolean;
    showBookmarks: boolean;
    showDetails: boolean;
    showHistory: boolean;
    sidebarPosition: SidebarPositionType;
    sidebarMode: SidebarModeType;
    textColor: string;
    backgroundColor: string;
}

export enum SidebarPositionType {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right'
}

export enum SidebarModeType {
    HALF = 'half',
    FULL = 'full',
}

export enum UIActions {
    OPEN_SETTINGS_SIDEBAR = 'UI/OPEN_SETTINGS_SIDEBAR',
    OPEN_BOOKMARKS_SIDEBAR = 'UI/OPEN_BOOKMARKS_SIDEBAR',
    OPEN_DETAILS_SIDEBAR = 'UI/OPEN_DETAILS_SIDEBAR',
    OPEN_HISTORY_SIDEBAR = 'UI/OPEN_HISTORY_SIDEBAR',
    CLOSE_ALL_SIDEBAR = 'UI/CLOSE_ALL_SIDEBAR',
}

export interface OpenSettingsSidebarAction extends Action<UIActions.OPEN_SETTINGS_SIDEBAR> {
    type: UIActions.OPEN_SETTINGS_SIDEBAR;
}

export interface OpenBookmarksSidebarAction extends Action<UIActions.OPEN_BOOKMARKS_SIDEBAR> {
    type: UIActions.OPEN_BOOKMARKS_SIDEBAR;
}

export interface OpenDetailsSidebarAction extends Action<UIActions.OPEN_DETAILS_SIDEBAR> {
    type: UIActions.OPEN_DETAILS_SIDEBAR;
}

export interface OpenHistorySidebarAction extends Action<UIActions.OPEN_HISTORY_SIDEBAR> {
    type: UIActions.OPEN_HISTORY_SIDEBAR;
}

export interface CloseAllSidebarAction extends Action<UIActions.CLOSE_ALL_SIDEBAR> {
    type: UIActions.CLOSE_ALL_SIDEBAR;
}


export type UIActionType = OpenSettingsSidebarAction
                         | OpenBookmarksSidebarAction
                         | OpenDetailsSidebarAction
                         | OpenHistorySidebarAction
                         | CloseAllSidebarAction;

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

const INITIAL_STATE: UIState = {
    showSettings: false,
    showBookmarks: false,
    showDetails: false,
    showHistory: false,
    sidebarPosition: SidebarPositionType.LEFT,
    sidebarMode: SidebarModeType.HALF,
    textColor: 'white',
    backgroundColor: '#282c34',
};

export const uiState = (
    state: UIState = INITIAL_STATE, // defaultSearchConfig,
    action: UIActionType
): UIState => {
    switch (action.type) {

        case UIActions.OPEN_SETTINGS_SIDEBAR:
            return { ...state, showSettings: true };

        case UIActions.OPEN_BOOKMARKS_SIDEBAR:
            return { ...state, showBookmarks: true };

        case UIActions.OPEN_DETAILS_SIDEBAR:
            return { ...state, showDetails: true };

        case UIActions.OPEN_HISTORY_SIDEBAR:
            return { ...state, showHistory: true };

        case UIActions.CLOSE_ALL_SIDEBAR:
            return {
                ...state,
                showSettings: false,
                showBookmarks: false,
                showDetails: false,
                showHistory: false
            };

        default:
            return state;
    }
};
