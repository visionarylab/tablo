import { Action } from 'redux';
import { takeEvery, select, put } from 'redux-saga/effects';
import { defaultSidebarState, sidebarStateKey } from '../constants';
import StorageApi from 'api/StorageApi';


export interface SectionState {
    sectionList: Section[];
    isOnEdit: boolean;
}

export interface Section {
    id: string;
    title: string;
    items: SectionItem[];
    expanded: boolean;
}

export interface SectionItem {
    label: string;
    link: string;
}


export enum SectionActions {
    LOAD_SECTION_STATE = 'SECTION/LOAD_SECTION_STATE',
    LOAD_SECTION_STATE_SUCCESS = 'SECTION/LOAD_SECTION_STATE_SUCCESS',
    LOAD_SECTION_STATE_FAIL = 'SECTION/LOAD_SECTION_STATE_FAIL',

    SAVE_SECTION_STATE = 'SECTION/SAVE_SECTION_STATE',
    SAVE_SECTION_STATE_SUCCESS = 'SECTION/SAVE_SECTION_STATE_SUCCESS',
    SAVE_SECTION_STATE_FAIL = 'SECTION/SAVE_SECTION_STATE_FAIL',

    SET_SECTION = 'SECTION/SET_SECTION',
    MOVE_SECTION = 'SECTION/MOVE_SECTION',
    DELETE_SECTION = 'SECTION/DELETE_SECTION',

    TOGGLE_IS_ON_EDIT = 'SECTION/TOGGLE_IS_ON_EDIT',
}

export interface LoadSectionStateAction extends Action<SectionActions.LOAD_SECTION_STATE> {
    type: SectionActions.LOAD_SECTION_STATE;
}

export interface LoadSidebarStateFailAction extends Action<SectionActions.LOAD_SECTION_STATE_SUCCESS> {
    type: SectionActions.LOAD_SECTION_STATE_SUCCESS;
    payload: SectionState;
}

export interface LoadSidebarStateSuccessAction extends Action<SectionActions.LOAD_SECTION_STATE_FAIL> {
    type: SectionActions.LOAD_SECTION_STATE_FAIL;
}

export interface SaveSidebarStateAction extends Action<SectionActions.SAVE_SECTION_STATE> {
    type: SectionActions.SAVE_SECTION_STATE;
}

export interface SaveSidebarStateFailAction extends Action<SectionActions.SAVE_SECTION_STATE_SUCCESS> {
    type: SectionActions.SAVE_SECTION_STATE_SUCCESS;
}

export interface SaveSidebarStateSuccessAction extends Action<SidebarActions.SAVE_SECTION_STATE_FAIL> {
    type: SectionActions.SAVE_SECTION_STATE_FAIL;
}

export interface SetBrowserSectionAction extends Action<SidebarActions.SET_BROWSER_SECTION> {
    type: SectionActions.SET_BROWSER_SECTION;
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
    type: SidebarActions.LOAD_SECTION_STATE,
});

export const loadSidebarStateSuccess = (payload: SidebarState) => ({
    type: SidebarActions.LOAD_SECTION_STATE_SUCCESS,
    payload: payload,
});

export const loadSidebarStateFail = () => ({
    type: SidebarActions.LOAD_SECTION_STATE,
});

export const saveSidebarState = () => ({
    type: SidebarActions.SAVE_SECTION_STATE,
});

export const saveSidebarStateSuccess = () => ({
    type: SidebarActions.SAVE_SECTION_STATE_SUCCESS,
});

export const saveSidebarStateFail = () => ({
    type: SidebarActions.SAVE_SECTION_STATE,
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

        case SidebarActions.LOAD_SECTION_STATE:
            return state;
        case SidebarActions.LOAD_SECTION_STATE_SUCCESS:
            return { ...state, ...action.payload };
        case SidebarActions.LOAD_SECTION_STATE_FAIL:
            return state;

        case SidebarActions.SAVE_SECTION_STATE:
            return state;
        case SidebarActions.SAVE_SECTION_STATE_SUCCESS:
            return state;
        case SidebarActions.SAVE_SECTION_STATE_FAIL:
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
