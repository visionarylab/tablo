import { Action } from 'redux';
import { takeEvery, select, put } from 'redux-saga/effects';
import { defaultUIState, defaultUIStateKey } from 'store/constants';
import StorageApi from 'api/StorageApi';

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
    CURRENT = 'CURRENT',
    NEW = 'NEW',
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

export enum UIActions {
    LOAD_UI_STATE = 'UI/LOAD_UI_STATE',
    LOAD_UI_STATE_SUCCESS = 'UI/LOAD_UI_STATE_SUCCESS',
    LOAD_UI_STATE_FAIL = 'UI/LOAD_UI_STATE_FAIL',

    SAVE_UI_STATE = 'UI/SAVE_UI_STATE',
    SAVE_UI_STATE_SUCCESS = 'UI/SAVE_UI_STATE_SUCCESS',
    SAVE_UI_STATE_FAIL = 'UI/SAVE_UI_STATE_FAIL',

    TOGGLE_SETTINGS = 'UI/TOGGLE_SETTINGS',
    TOGGLE_BOOKMARKS = 'UI/TOGGLE_BOOKMARKS',
    TOGGLE_DETAILS = 'UI/TOGGLE_DETAILS',
    TOGGLE_HISTORY = 'UI/TOGGLE_HISTORY',
    TOGGLE_EDIT = 'UI/TOGGLE_EDIT',
    CLOSE_ALL = 'UI/CLOSE_ALL',
    SET_THEME = 'UI/SET_THEME',
    SET_OPEN_LINK = 'UI/SET_OPEN_LINK',
}

export interface LoadUIStateAction extends Action<UIActions.LOAD_UI_STATE> {
    type: UIActions.LOAD_UI_STATE;
}

export interface LoadUIStateFailAction extends Action<UIActions.LOAD_UI_STATE_SUCCESS> {
    type: UIActions.LOAD_UI_STATE_SUCCESS;
    payload: UIState | any;
}

export interface LoadUIStateSuccessAction extends Action<UIActions.LOAD_UI_STATE_FAIL> {
    type: UIActions.LOAD_UI_STATE_FAIL;
}

export interface SaveUIStateAction extends Action<UIActions.SAVE_UI_STATE> {
    type: UIActions.SAVE_UI_STATE;
}

export interface SaveUIStateFailAction extends Action<UIActions.SAVE_UI_STATE_SUCCESS> {
    type: UIActions.SAVE_UI_STATE_SUCCESS;
}

export interface SaveUIStateSuccessAction extends Action<UIActions.SAVE_UI_STATE_FAIL> {
    type: UIActions.SAVE_UI_STATE_FAIL;
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

export type UIActionType = LoadUIStateAction
    | LoadUIStateFailAction
    | LoadUIStateSuccessAction
    | SaveUIStateAction
    | SaveUIStateFailAction
    | SaveUIStateSuccessAction
    | ToggleSettingsAction
    | ToggleBookmarksAction
    | ToggleDetailsAction
    | ToggleHistoryAction
    | ToggleEditAction
    | CloseAllAction
    | SetThemeAction
    | SetOpenLinkAction;


export const loadUIState = () => ({
    type: UIActions.LOAD_UI_STATE,
});

export const loadUIStateSuccess = (payload: UIState | any) => ({
    type: UIActions.LOAD_UI_STATE_SUCCESS,
    payload: payload,
});

export const loadUIStateFail = () => ({
    type: UIActions.LOAD_UI_STATE,
});

export const saveUIState = () => ({
    type: UIActions.SAVE_UI_STATE,
});

export const saveUIStateSuccess = () => ({
    type: UIActions.SAVE_UI_STATE_SUCCESS,
});

export const saveUIStateFail = () => ({
    type: UIActions.SAVE_UI_STATE,
});

export const toggleSettings = () => ({
    type: UIActions.TOGGLE_SETTINGS,
});

export const toggleBookmarks = () => ({
    type: UIActions.TOGGLE_BOOKMARKS,
});

export const toggleDetails = () => ({
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

export const uiState = (
    state: UIState = defaultUIState,
    action: UIActionType
): UIState => {
    switch (action.type) {

        case UIActions.LOAD_UI_STATE:
            return state;
        case UIActions.LOAD_UI_STATE_SUCCESS:
            return { ...state, ...action.payload };
        case UIActions.LOAD_UI_STATE_FAIL:
            return state;

        case UIActions.SAVE_UI_STATE:
            return state;
        case UIActions.SAVE_UI_STATE_SUCCESS:
            return state;
        case UIActions.SAVE_UI_STATE_FAIL:
            return state;

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


// ASYNC ACTIONS
export const loadUIStateAsync = () => {
    return async (dispatch: any, getState: any) => {
        dispatch(loadUIState())
        return StorageApi.getItems(defaultUIStateKey, defaultUIState)
            .then((uiState: UIState) => dispatch(loadUIStateSuccess(uiState)))
            .catch((err: any) => dispatch(loadUIStateFail()));
    };
}

/// SAGA
const saveUIStateSaga = takeEvery([
    UIActions.TOGGLE_BOOKMARKS,
    UIActions.TOGGLE_DETAILS,
    UIActions.TOGGLE_EDIT,
    UIActions.TOGGLE_HISTORY,
    UIActions.TOGGLE_SETTINGS,
    UIActions.SET_THEME,
    UIActions.SET_OPEN_LINK,
],
    function* () {
        const rootState = yield select();
        yield put(saveUIState());
        const saved = yield StorageApi.setItems(defaultUIStateKey, rootState.uiState);
        if (saved) {
            yield put(saveUIStateSuccess());
        } else {
            yield put(saveUIStateFail());
        }
    });

export const uiSaga = [
    saveUIStateSaga,
];
