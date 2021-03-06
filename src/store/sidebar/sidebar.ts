import { Action } from 'redux';
import { takeEvery, select, put } from 'redux-saga/effects';
import { defaultSidebarState, sidebarStateKey } from '../constants';
import StorageApi from 'api/StorageApi';

export interface SidebarState {
    browserSection: Section;
    userSection: Section;
    isOnEdit: boolean;
    itemOnEdit: SectionItem | null;
}

export interface Section {
    title: string;
    items: SectionItem[];
    isHidable: boolean;
    isDeletable: boolean;
    expanded: boolean;
}

export interface SectionItem {
    label: string;
    link: string;
    icon?: string;
    visible?: boolean;
}

export enum SidebarActions {
    LOAD_SIDEBAR_STATE = 'SIDEBAR/LOAD_SIDEBAR_STATE',
    LOAD_SIDEBAR_STATE_SUCCESS = 'SIDEBAR/LOAD_SIDEBAR_STATE_SUCCESS',
    LOAD_SIDEBAR_STATE_FAIL = 'SIDEBAR/LOAD_SIDEBAR_STATE_FAIL',

    SAVE_SIDEBAR_STATE = 'SIDEBAR/SAVE_SIDEBAR_STATE',
    SAVE_SIDEBAR_STATE_SUCCESS = 'SIDEBAR/SAVE_SIDEBAR_STATE_SUCCESS',
    SAVE_SIDEBAR_STATE_FAIL = 'SIDEBAR/SAVE_SIDEBAR_STATE_FAIL',

    SET_BROWSER_SECTION = 'SIDEBAR/SET_BROWSER_SECTION',
    SET_USER_SECTION = 'SIDEBAR/SET_USER_SECTION',

    TOGGLE_IS_ON_EDIT = 'SIDEBAR/TOGGLE_IS_ON_EDIT',
}

export interface LoadSidebarStateAction extends Action<SidebarActions.LOAD_SIDEBAR_STATE> {
    type: SidebarActions.LOAD_SIDEBAR_STATE;
}

export interface LoadSidebarStateFailAction extends Action<SidebarActions.LOAD_SIDEBAR_STATE_SUCCESS> {
    type: SidebarActions.LOAD_SIDEBAR_STATE_SUCCESS;
    payload: SidebarState;
}

export interface LoadSidebarStateSuccessAction extends Action<SidebarActions.LOAD_SIDEBAR_STATE_FAIL> {
    type: SidebarActions.LOAD_SIDEBAR_STATE_FAIL;
}

export interface SaveSidebarStateAction extends Action<SidebarActions.SAVE_SIDEBAR_STATE> {
    type: SidebarActions.SAVE_SIDEBAR_STATE;
}

export interface SaveSidebarStateFailAction extends Action<SidebarActions.SAVE_SIDEBAR_STATE_SUCCESS> {
    type: SidebarActions.SAVE_SIDEBAR_STATE_SUCCESS;
}

export interface SaveSidebarStateSuccessAction extends Action<SidebarActions.SAVE_SIDEBAR_STATE_FAIL> {
    type: SidebarActions.SAVE_SIDEBAR_STATE_FAIL;
}

export interface SetBrowserSectionAction extends Action<SidebarActions.SET_BROWSER_SECTION> {
    type: SidebarActions.SET_BROWSER_SECTION;
    payload: Section;
}

export interface SetUserSectionAction extends Action<SidebarActions.SET_USER_SECTION> {
    type: SidebarActions.SET_USER_SECTION;
    payload: Section;
}

export interface ToggleIsOnEditAction extends Action<SidebarActions.TOGGLE_IS_ON_EDIT> {
    type: SidebarActions.TOGGLE_IS_ON_EDIT;
}

export type SidebarActionType = LoadSidebarStateAction
                              | LoadSidebarStateFailAction
                              | LoadSidebarStateSuccessAction
                              | SaveSidebarStateAction
                              | SaveSidebarStateFailAction
                              | SaveSidebarStateSuccessAction
                              | SetBrowserSectionAction
                              | SetUserSectionAction
                              | ToggleIsOnEditAction;

export const loadSidebarState = () => ({
    type: SidebarActions.LOAD_SIDEBAR_STATE,
});

export const loadSidebarStateSuccess = (payload: SidebarState) => ({
    type: SidebarActions.LOAD_SIDEBAR_STATE_SUCCESS,
    payload: payload,
});

export const loadSidebarStateFail = () => ({
    type: SidebarActions.LOAD_SIDEBAR_STATE,
});

export const saveSidebarState = () => ({
    type: SidebarActions.SAVE_SIDEBAR_STATE,
});

export const saveSidebarStateSuccess = () => ({
    type: SidebarActions.SAVE_SIDEBAR_STATE_SUCCESS,
});

export const saveSidebarStateFail = () => ({
    type: SidebarActions.SAVE_SIDEBAR_STATE,
});

export const setBrowserSection = (payload: Section) => ({
    type: SidebarActions.SET_BROWSER_SECTION,
    payload: payload,
});

export const setUserSection = (payload: Section) => ({
    type: SidebarActions.SET_USER_SECTION,
    payload: payload,
});

export const toggleIsOnEdit = () => ({
    type: SidebarActions.TOGGLE_IS_ON_EDIT,
});

export const sidebarState = (
    state: SidebarState = defaultSidebarState,
    action: SidebarActionType
): SidebarState => {
    switch (action.type) {

        case SidebarActions.LOAD_SIDEBAR_STATE:
            return state;
        case SidebarActions.LOAD_SIDEBAR_STATE_SUCCESS:
            return { ...state, ...action.payload };
        case SidebarActions.LOAD_SIDEBAR_STATE_FAIL:
            return state;

        case SidebarActions.SAVE_SIDEBAR_STATE:
            return state;
        case SidebarActions.SAVE_SIDEBAR_STATE_SUCCESS:
            return state;
        case SidebarActions.SAVE_SIDEBAR_STATE_FAIL:
            return state;

        case SidebarActions.SET_BROWSER_SECTION:
            return { ...state, browserSection: {...action.payload} };
        case SidebarActions.SET_USER_SECTION:
            return { ...state, userSection: {...action.payload} };

        case SidebarActions.TOGGLE_IS_ON_EDIT:
            return { ...state, isOnEdit: !state.isOnEdit };

        default:
            return state;
    }
};

// ASYNC ACTIONS
export const loadSidebarStateAsync = () => {
    return async (dispatch: any, getState: any) => {
        dispatch(loadSidebarState())
        return StorageApi.getItems(sidebarStateKey, defaultSidebarState)
            .then((sidebarState: SidebarState) => dispatch(loadSidebarStateSuccess(sidebarState)))
            .catch((err: any) => dispatch(loadSidebarStateFail()));
    };
}

/// SAGA
const saveSidebarSaga = takeEvery([
    SidebarActions.SET_BROWSER_SECTION,
    SidebarActions.SET_USER_SECTION,
],
function* () {
    const rootState = yield select();
    yield put(saveSidebarState());
    const saved = yield StorageApi.setItems(sidebarStateKey, rootState.sidebarState);
    if (saved) {
        yield put(saveSidebarStateSuccess());
    } else {
        yield put(saveSidebarStateFail());
    }
});

export const sidebarSaga = [
    saveSidebarSaga,
];
