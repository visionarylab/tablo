import { searchStatekey, defaultSearchState } from './constants';
import StorageApi from 'api/StorageApi';
import { Action } from 'redux';
import { takeEvery, select, put } from "redux-saga/effects";

export interface SearchState {
    searchEngines: SearchEngine[];
    selectedSearchEngineId: string | any;
    searchInNewTab: boolean;
}

export interface SearchEngine {
    id: string;
    pos: number;
    name: string;
    baseUrl: string;
    queryParam: string;
    params: SearchEngineParam[];
}

export interface SearchEngineParam {
    key: string;
    value: string | number;
}

export enum SearchActions {
    LOAD_SEARCH_STATE = 'SEARCH/LOAD_SEARCH_STATE',
    LOAD_SEARCH_STATE_SUCCESS = 'SEARCH/LOAD_SEARCH_STATE_SUCCESS',
    LOAD_SEARCH_STATE_FAIL = 'SEARCH/LOAD_SEARCH_STATE_FAIL',
    SAVE_SEARCH_STATE = 'SEARCH/SAVE_SEARCH_STATE',
    SAVE_SEARCH_STATE_SUCCESS = 'SEARCH/SAVE_SEARCH_STATE_SUCCESS',
    SAVE_SEARCH_STATE_FAIL = 'SEARCH/SAVE_SEARCH_STATE_FAIL',
    SELECT_SEARCH_ENGINE = 'SEARCH/SELECT_SEARCH_ENGINE',
    ADD_SEARCH_ENGINE = 'SEARCH/ADD_SEARCH_ENGINE',
    UPDATE_SEARCH_ENGINE = 'SEARCH/UPDATE_SEARCH_ENGINE',
    DELETE_SEARCH_ENGINE = 'SEARCH/DELETE_SEARCH_ENGINE',
    SET_SEARCH_IN_NEW_TAB = 'SEARCH/SET_SEARCH_IN_NEW_TAB',
}

export interface LoadSearchStateAction extends Action<SearchActions.LOAD_SEARCH_STATE> {
    type: SearchActions.LOAD_SEARCH_STATE;
}

export interface LoadSearchStateSuccessAction extends Action<SearchActions.LOAD_SEARCH_STATE_SUCCESS> {
    type: SearchActions.LOAD_SEARCH_STATE_SUCCESS;
    payload: SearchState;
}

export interface LoadSearchStateFailAction extends Action<SearchActions.LOAD_SEARCH_STATE_FAIL> {
    type: SearchActions.LOAD_SEARCH_STATE_FAIL;
}

export interface SaveSearchStateAction extends Action<SearchActions.SAVE_SEARCH_STATE> {
    type: SearchActions.SAVE_SEARCH_STATE;
}

export interface SaveSearchStateSuccessAction extends Action<SearchActions.SAVE_SEARCH_STATE_SUCCESS> {
    type: SearchActions.SAVE_SEARCH_STATE_SUCCESS;
}

export interface SaveSearchStateFailAction extends Action<SearchActions.SAVE_SEARCH_STATE_FAIL> {
    type: SearchActions.SAVE_SEARCH_STATE_FAIL;
}

export interface SelectSearchEngineAction extends Action<SearchActions.SELECT_SEARCH_ENGINE> {
    type: SearchActions.SELECT_SEARCH_ENGINE;
    payload: string;
}

export interface AddSearchEngineAction extends Action<SearchActions.ADD_SEARCH_ENGINE> {
    type: SearchActions.ADD_SEARCH_ENGINE;
    payload: SearchEngine;
}

export interface UpdateSearchEngineAction extends Action<SearchActions.UPDATE_SEARCH_ENGINE> {
    type: SearchActions.UPDATE_SEARCH_ENGINE;
    payload: SearchEngine;
}

export interface DeleteSearchEngineAction extends Action<SearchActions.DELETE_SEARCH_ENGINE> {
    type: SearchActions.DELETE_SEARCH_ENGINE;
    payload: string;
}

export interface SetSearchInNewTanAction extends Action<SearchActions.SET_SEARCH_IN_NEW_TAB> {
    type: SearchActions.SET_SEARCH_IN_NEW_TAB;
    payload: boolean;
}

export type SearchActionType =
    | LoadSearchStateAction
    | LoadSearchStateSuccessAction
    | LoadSearchStateFailAction
    | SaveSearchStateAction
    | SaveSearchStateSuccessAction
    | SaveSearchStateFailAction
    | SelectSearchEngineAction
    | AddSearchEngineAction
    | UpdateSearchEngineAction
    | DeleteSearchEngineAction
    | SetSearchInNewTanAction;

export const loadSearchState = () => ({
    type: SearchActions.LOAD_SEARCH_STATE
});

export const loadSearchStateSuccess = (payload: any) => ({
    type: SearchActions.LOAD_SEARCH_STATE_SUCCESS,
    payload: payload
});

export const loadSearchStateFail = () => ({
    type: SearchActions.LOAD_SEARCH_STATE_FAIL,
});

export const saveSearchState = () => ({
    type: SearchActions.SAVE_SEARCH_STATE
});

export const saveSearchStateSuccess = () => ({
    type: SearchActions.SAVE_SEARCH_STATE_SUCCESS
});

export const saveSearchStateFail = () => ({
    type: SearchActions.SAVE_SEARCH_STATE_FAIL
});

export const selectSearchEngine = (payload: any) => ({
    type: SearchActions.SELECT_SEARCH_ENGINE,
    payload: payload
});

export const addSearchEngine = (payload: any) => ({
    type: SearchActions.ADD_SEARCH_ENGINE,
    payload: payload
});

export const updateSearchEngine = (payload: any) => ({
    type: SearchActions.UPDATE_SEARCH_ENGINE,
    payload: payload
});

export const deleteSearchEngine = (payload: any) => ({
    type: SearchActions.DELETE_SEARCH_ENGINE,
    payload: payload
});

export const setSearchInNewTab = (payload: any) => ({
    type: SearchActions.SET_SEARCH_IN_NEW_TAB,
    payload: payload
});

const INITIAL_STATE: SearchState = {
    searchEngines: [],
    selectedSearchEngineId: null,
    searchInNewTab: true
};

export const searchState = (
    state: SearchState = INITIAL_STATE, // defaultSearchConfig,
    action: SearchActionType
): SearchState => {
    switch (action.type) {

        case SearchActions.LOAD_SEARCH_STATE:
            return state;
        case SearchActions.LOAD_SEARCH_STATE_SUCCESS:
            return { ...state, ...action.payload };
        case SearchActions.LOAD_SEARCH_STATE_FAIL:
            return state;

        case SearchActions.SAVE_SEARCH_STATE:
            return state;
        case SearchActions.SAVE_SEARCH_STATE_SUCCESS:
            return state;
        case SearchActions.SAVE_SEARCH_STATE_FAIL:
            return state;

        case SearchActions.SELECT_SEARCH_ENGINE:
            return {
                ...state,
                selectedSearchEngineId: action.payload
            };

        case SearchActions.ADD_SEARCH_ENGINE:
            return {
                ...state,
                searchEngines: [
                    ...state.searchEngines,
                    action.payload
                ]
            };

        case SearchActions.UPDATE_SEARCH_ENGINE:
            return {
                ...state,
                searchEngines: state.searchEngines.map(searchEngine => {
                    return (searchEngine.id === action.payload.id)
                        ? action.payload
                        : searchEngine;
                })
            };

        case SearchActions.DELETE_SEARCH_ENGINE:
            return {
                ...state,
                searchEngines: state.searchEngines.filter(searchEngine => searchEngine.id !== action.payload)
            };

        case SearchActions.SET_SEARCH_IN_NEW_TAB:
            return {
                ...state,
                searchInNewTab: !!action.payload
            };

        default:
            return state;
    }
};


// ASYNC ACTIONS
export const loadSearchStateAsync = () => {
    return (dispatch: any, getState: any) => {
        dispatch(loadSearchState())
        return StorageApi.getItems(searchStatekey, defaultSearchState)
            .then((searchState: SearchState) => {
                if (!searchState.selectedSearchEngineId && searchState.searchEngines && searchState.searchEngines.length > 0) {
                    searchState.selectedSearchEngineId = searchState.searchEngines[0].id;
                }
                return searchState;
            })
            .then((state: any) => dispatch(loadSearchStateSuccess(state)))
            .catch((err: any) => dispatch(loadSearchStateFail()));
    };
}


/// SAGA
const saveSearchStateSaga = takeEvery([
    SearchActions.SELECT_SEARCH_ENGINE,
    SearchActions.ADD_SEARCH_ENGINE,
    SearchActions.UPDATE_SEARCH_ENGINE,
    SearchActions.DELETE_SEARCH_ENGINE,
    SearchActions.SET_SEARCH_IN_NEW_TAB
],
function* () {
    const state = yield select();
    yield put(saveSearchState());
    const saved = yield StorageApi.setItems(searchStatekey, state.searchState);
    if (saved) {
        yield put(saveSearchStateSuccess());
    } else {
        yield put(saveSearchStateFail());
    }
});

export const searchSaga = [
    saveSearchStateSaga,
];