import { Action } from 'redux';
import { takeEvery, select, put } from "redux-saga/effects";
import { pictureStateKey, defaultPictureState } from './constants';
import api from 'api';

export interface PictureState {
    current: Picture | any;
    history: Picture[];
    maxHistoryCount: number;
}

export interface Picture {
    type: string;
    from: string;
    artiste: string;
    artisteBio: string;
    date: string;
    title: string;
    subTitle: string;
    medium: string;
    dimensions: string;
    classification: string;
    credits: string;
    originalData?: any;
    medias: Medias;
}

export interface Medias {
    mini: string;
    medium: string;
    max: string;
    page: string;
}

export enum PictureActions {
    LOAD_PICTURE_STATE = 'PICTURE/LOAD_PICTURE_STATE',
    LOAD_PICTURE_STATE_SUCCESS = 'PICTURE/LOAD_PICTURE_STATE_SUCCESS',
    LOAD_PICTURE_STATE_FAIL = 'PICTURE/LOAD_PICTURE_STATE_FAIL',

    SAVE_PICTURE_STATE = 'PICTURE/SAVE_PICTURE_STATE',
    SAVE_PICTURE_STATE_SUCCESS = 'PICTURE/SAVE_PICTURE_STATE_SUCCESS',
    SAVE_PICTURE_STATE_FAIL = 'PICTURE/SAVE_PICTURE_STATE_FAIL',

    GET_RANDOM_PICTURE = 'PICTURE/GET_RANDOM_PICTURE',
    GET_RANDOM_PICTURE_SUCCESS = 'PICTURE/GET_RANDOM_PICTURE_SUCCESS',
    GET_RANDOM_PICTURE_FAIL = 'PICTURE/GET_RANDOM_PICTURE_FAIL',

    SET_MAX_HISTORY_COUNT = 'PICTURE/SET_MAX_HISTORY_COUNT',
}

export interface LoadPictureStateAction extends Action<PictureActions.LOAD_PICTURE_STATE> {
    type: PictureActions.LOAD_PICTURE_STATE;
}

export interface LoadPictureStateSuccessAction extends Action<PictureActions.LOAD_PICTURE_STATE_SUCCESS> {
    type: PictureActions.LOAD_PICTURE_STATE_SUCCESS;
    payload: PictureState;
}

export interface LoadPictureStateFailAction extends Action<PictureActions.LOAD_PICTURE_STATE_FAIL> {
    type: PictureActions.LOAD_PICTURE_STATE_FAIL;
}

export interface SavePictureStateAction extends Action<PictureActions.SAVE_PICTURE_STATE> {
    type: PictureActions.SAVE_PICTURE_STATE;
}

export interface SavePictureStateSuccessAction extends Action<PictureActions.SAVE_PICTURE_STATE_SUCCESS> {
    type: PictureActions.SAVE_PICTURE_STATE_SUCCESS;
}

export interface SavePictureStateFailAction extends Action<PictureActions.SAVE_PICTURE_STATE_FAIL> {
    type: PictureActions.SAVE_PICTURE_STATE_FAIL;
}

export interface GetRandomPictureAction extends Action<PictureActions.GET_RANDOM_PICTURE> {
    type: PictureActions.GET_RANDOM_PICTURE;
}

export interface GetRandomPictureSuccessAction extends Action<PictureActions.GET_RANDOM_PICTURE_SUCCESS> {
    type: PictureActions.GET_RANDOM_PICTURE_SUCCESS;
    payload: Picture;
}

export interface GetRandomPictureFailAction extends Action<PictureActions.GET_RANDOM_PICTURE_FAIL> {
    type: PictureActions.GET_RANDOM_PICTURE_FAIL;
}

export interface SetMaxHistoryCountAction extends Action<PictureActions.SET_MAX_HISTORY_COUNT> {
    type: PictureActions.SET_MAX_HISTORY_COUNT;
    payload: number;
}

export type PictureActionType =
    | LoadPictureStateAction
    | LoadPictureStateSuccessAction
    | LoadPictureStateFailAction
    | SavePictureStateAction
    | SavePictureStateSuccessAction
    | SavePictureStateFailAction
    | GetRandomPictureAction
    | GetRandomPictureSuccessAction
    | GetRandomPictureFailAction
    | SetMaxHistoryCountAction;

export const loadPictureState = () => ({
    type: PictureActions.LOAD_PICTURE_STATE,
});

export const loadPictureStateSuccess = (payload: PictureState) => ({
    type: PictureActions.LOAD_PICTURE_STATE_SUCCESS,
    payload: payload
});

export const loadPictureStateFail = () => ({
    type: PictureActions.LOAD_PICTURE_STATE_FAIL,
});

export const savePictureState = () => ({
    type: PictureActions.SAVE_PICTURE_STATE,
});

export const savePictureStateSuccess = () => ({
    type: PictureActions.SAVE_PICTURE_STATE_SUCCESS,
});

export const savePictureStateFail = () => ({
    type: PictureActions.SAVE_PICTURE_STATE_FAIL,
});

export const getRandomPicture = () => ({
    type: PictureActions.GET_RANDOM_PICTURE,
});

export const getRandomPictureSuccess = (payload: Picture) => ({
    type: PictureActions.GET_RANDOM_PICTURE_SUCCESS,
    payload: payload
});

export const getRandomPictureFail = () => ({
    type: PictureActions.GET_RANDOM_PICTURE_FAIL,
});

export const setMaxHistoryCount = (payload: number) => ({
    type: PictureActions.SET_MAX_HISTORY_COUNT,
    payload: payload
});

const INITIAL_STATE: PictureState = {
    current: null,
    history: [],
    maxHistoryCount: 10
};

export const pictureState = (
    state: PictureState = INITIAL_STATE, // defaultSearchConfig,
    action: PictureActionType
): PictureState => {
    switch (action.type) {

        case PictureActions.LOAD_PICTURE_STATE:
            return state;
        case PictureActions.LOAD_PICTURE_STATE_SUCCESS:
            return { ...state, ...action.payload };
        case PictureActions.LOAD_PICTURE_STATE_FAIL:
            return state;

        case PictureActions.SAVE_PICTURE_STATE:
            return state;
        case PictureActions.SAVE_PICTURE_STATE_SUCCESS:
            return state;
        case PictureActions.SAVE_PICTURE_STATE_FAIL:
            return state;

        case PictureActions.GET_RANDOM_PICTURE:
            return state;
        case PictureActions.GET_RANDOM_PICTURE_SUCCESS:
            state.history.push(state.current);
            return {
                ...state,
                current: action.payload,
                history: updateHistory(state.history, state.maxHistoryCount)
            };
        case PictureActions.GET_RANDOM_PICTURE_FAIL:
            return state;

        case PictureActions.SET_MAX_HISTORY_COUNT:
            return {
                ...state,
                history: updateHistory(state.history, action.payload),
                maxHistoryCount: action.payload
            };

        default:
            return state;
    }
};

const updateHistory = (history: Picture[], maxHistoryCount: number): Picture[] => {
    if (history.length > maxHistoryCount) {
        const countToRm = history.length - maxHistoryCount;
        for (let i = 0; i < countToRm; i++) {
            history.shift();
        }
    }
    return history;
}

// ASYNC ACTIONS
export const loadPictureStateAsync = () => {
    return (dispatch: any, getState: any) => {
        dispatch(loadPictureState())
        return api.storage.getItems(pictureStateKey, defaultPictureState)
            .then((pictureState: PictureState) => dispatch(loadPictureStateSuccess(pictureState)))
            .catch((err: any) => dispatch(loadPictureStateFail()));
    };
}

export const getRandomPictureAsync = () => {
    return (dispatch: any, getState: any) => {
        dispatch(getRandomPicture())
        return api.picture.getRandomPicture()
            .then((picture: Picture) => dispatch(getRandomPictureSuccess(picture)))
            .catch((err: any) => dispatch(getRandomPictureFail()));
    };
}

/// SAGA
const saveSearchStateSaga = takeEvery([
    PictureActions.GET_RANDOM_PICTURE_SUCCESS,
    PictureActions.SET_MAX_HISTORY_COUNT,
],
function* () {
    const rootState = yield select();
    yield put(savePictureState());
    const saved = yield api.storage.setItems(pictureStateKey, rootState.pictureState);
    if (saved) {
        yield put(savePictureStateSuccess());
    } else {
        yield put(savePictureStateFail());
    }
});

export const pictureSaga = [
    saveSearchStateSaga,
];