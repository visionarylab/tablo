import { Action } from 'redux';
import { takeEvery, select, put } from 'redux-saga/effects';
import { pictureStateKey, defaultPictureState } from './constants';
import StorageApi from 'api/StorageApi';
import PictureApi from 'api/PictureApi';

export interface PictureState {
    currentPictureIndex: Picture | any;
    pictures: Picture[];
    maxPicturesCount: number;
    showDetails: boolean;
    showHistory: boolean;
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

    SET_PICTURE_INDEX = 'PICTURE/SET_PICTURE_INDEX',
    SET_MAX_PICTURES_COUNT = 'PICTURE/SET_MAX_PICTURES_COUNT',

    TOGGLE_SHOW_DETAILS = 'PICTURE/TOGGLE_SHOW_DETAILS',
    TOGGLE_SHOW_HISTORY = 'PICTURE/TOGGLE_SHOW_HISTORY',
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

export interface SetMaxPicturesCountAction extends Action<PictureActions.SET_MAX_PICTURES_COUNT> {
    type: PictureActions.SET_MAX_PICTURES_COUNT;
    payload: number;
}

export interface SetPictureIndexAction extends Action<PictureActions.SET_PICTURE_INDEX> {
    type: PictureActions.SET_PICTURE_INDEX;
    payload: number;
}

export interface ShowDetailsAction extends Action<PictureActions.TOGGLE_SHOW_DETAILS> {
    type: PictureActions.TOGGLE_SHOW_DETAILS;
}

export interface ShowHistoryAction extends Action<PictureActions.TOGGLE_SHOW_HISTORY> {
    type: PictureActions.TOGGLE_SHOW_HISTORY;
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
    | SetPictureIndexAction
    | SetMaxPicturesCountAction
    | ShowDetailsAction
    | ShowHistoryAction;

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

export const setPictureIndex = (payload: number) => ({
    type: PictureActions.SET_PICTURE_INDEX,
    payload: payload
});

export const setMaxPicturesCount = (payload: number) => ({
    type: PictureActions.SET_MAX_PICTURES_COUNT,
    payload: payload
});

export const toggleShowDetails = () => ({
    type: PictureActions.TOGGLE_SHOW_DETAILS,
});

export const toggleShowHistory = () => ({
    type: PictureActions.TOGGLE_SHOW_HISTORY,
});


const INITIAL_STATE: PictureState = {
    currentPictureIndex: 0,
    pictures: [],
    maxPicturesCount: 10,
    showDetails: false,
    showHistory: false,
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
            if (action.payload) {
                state.pictures.unshift(action.payload);
            }
            state.pictures.splice(state.maxPicturesCount);
            return {
                ...state,
                pictures: [...state.pictures],
                currentPictureIndex: 0,
            };
        case PictureActions.GET_RANDOM_PICTURE_FAIL:
            return state;

        case PictureActions.SET_PICTURE_INDEX:
            return {
                ...state,
                currentPictureIndex: action.payload,
            };

        case PictureActions.SET_MAX_PICTURES_COUNT:
            const maxPicturesCount = action.payload;
            state.pictures.splice(maxPicturesCount);

            const currentPictureIndex = state.currentPictureIndex < state.pictures.length
                ? state.currentPictureIndex
                : state.pictures.length - 1
            return {
                ...state,
                pictures: state.pictures,
                currentPictureIndex: currentPictureIndex,
                maxPicturesCount: maxPicturesCount,
            };

        case PictureActions.TOGGLE_SHOW_DETAILS:
            return { ...state, showDetails: !state.showDetails };

        case PictureActions.TOGGLE_SHOW_HISTORY:
            return { ...state, showHistory: !state.showHistory };

        default:
            return state;
    }
};

// ASYNC ACTIONS
export const loadPictureStateAsync = () => {
    return async (dispatch: any, getState: any) => {
        dispatch(loadPictureState())
        return StorageApi.getItems(pictureStateKey, defaultPictureState)
            .then((pictureState: PictureState) => dispatch(loadPictureStateSuccess(pictureState)))
            .catch((err: any) => dispatch(loadPictureStateFail()));
    };
}

export const getRandomPictureAsync = () => {
    return (dispatch: any, getState: any) => {
        dispatch(getRandomPicture())
        return PictureApi.getRandomPicture()
            .then((picture: Picture) => dispatch(getRandomPictureSuccess(picture)))
            .catch((err: any) => dispatch(getRandomPictureFail()));
    };
}

/// SAGA
const savePictureStateSaga = takeEvery([
    PictureActions.GET_RANDOM_PICTURE_SUCCESS,
    PictureActions.SET_MAX_PICTURES_COUNT,
],
function* () {
    const rootState = yield select();
    yield put(savePictureState());
    const saved = yield StorageApi.setItems(pictureStateKey, rootState.pictureState);
    if (saved) {
        yield put(savePictureStateSuccess());
    } else {
        yield put(savePictureStateFail());
    }
});

export const pictureSaga = [
    savePictureStateSaga,
];
