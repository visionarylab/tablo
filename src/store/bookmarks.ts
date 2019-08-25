import { Action } from 'redux';
import { takeEvery, select, put } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';
import { bookmarkStateKey, defaultBookmarkState } from './constants';
import api from 'api';

export interface BookmarkState {
    folders: Folder[];
    foldersFiltered: Folder[];
    isAllExpanded: boolean;
    query: string;
}

// See chrome.bookmarks.BookmarkTreeNode;
export interface Folder {
    id: string;
    index?: number;
    title: string;
    url?: string;
    parentId?: string;
    children: Bookmark[];
    dateAdded?: number;
    dateGroupModified?: number;
    unmodifiable: string | undefined;

    isExpanded: boolean;
}

export interface Bookmark {
    id: string;
    index?: number;
    title: string;
    url?: string;
    parentId?: string;
    dateAdded?: number;
    dateGroupModified?: number;
    unmodifiable: string | undefined;
}

export enum BookmarkActions {
    LOAD_BOOKMARK_STATE = 'BOOKMARK/LOAD_BOOKMARK_STATE',
    LOAD_BOOKMARK_STATE_SUCCESS = 'BOOKMARK/LOAD_BOOKMARK_STATE_SUCCESS',
    LOAD_BOOKMARK_STATE_FAIL = 'BOOKMARK/LOAD_BOOKMARK_STATE_FAIL',

    SAVE_BOOKMARK_STATE = 'BOOKMARK/SAVE_BOOKMARK_STATE',
    SAVE_BOOKMARK_STATE_SUCCESS = 'BOOKMARK/SAVE_BOOKMARK_STATE_SUCCESS',
    SAVE_BOOKMARK_STATE_FAIL = 'BOOKMARK/SAVE_BOOKMARK_STATE_FAIL',

    TOGGLE_EXPAND_BOOKMARK_FOLDER = 'BOOKMARK/TOGGLE_EXPAND_BOOKMARK_FOLDER',
    TOGGLE_EXPAND_BOOKMARK_FOLDER_ALL = 'BOOKMARK/TOGGLE_EXPAND_BOOKMARK_FOLDER_ALL',

    SEARCH_BOOKMARK = 'BOOKMARK/SEARCH_BOOKMARK',
}

export interface LoadBookmarkStateAction extends Action<BookmarkActions.LOAD_BOOKMARK_STATE> {
    type: BookmarkActions.LOAD_BOOKMARK_STATE;
}

export interface LoadBookmarkStateSuccessAction extends Action<BookmarkActions.LOAD_BOOKMARK_STATE_SUCCESS> {
    type: BookmarkActions.LOAD_BOOKMARK_STATE_SUCCESS;
    payload: BookmarkState;
}

export interface LoadBookmarkStateFailAction extends Action<BookmarkActions.LOAD_BOOKMARK_STATE_FAIL> {
    type: BookmarkActions.LOAD_BOOKMARK_STATE_FAIL;
}

export interface SaveBookmarkStateAction extends Action<BookmarkActions.SAVE_BOOKMARK_STATE> {
    type: BookmarkActions.SAVE_BOOKMARK_STATE;
}

export interface SaveBookmarkStateSuccessAction extends Action<BookmarkActions.SAVE_BOOKMARK_STATE_SUCCESS> {
    type: BookmarkActions.SAVE_BOOKMARK_STATE_SUCCESS;
}

export interface SaveBookmarkStateFailAction extends Action<BookmarkActions.SAVE_BOOKMARK_STATE_FAIL> {
    type: BookmarkActions.SAVE_BOOKMARK_STATE_FAIL;
}

export interface ToggleExpandBookmarkFolderAction extends Action<BookmarkActions.TOGGLE_EXPAND_BOOKMARK_FOLDER> {
    type: BookmarkActions.TOGGLE_EXPAND_BOOKMARK_FOLDER;
    payload: string;
}

export interface ToggleExpandBookmarkFolderAllAction extends Action<BookmarkActions.TOGGLE_EXPAND_BOOKMARK_FOLDER_ALL> {
    type: BookmarkActions.TOGGLE_EXPAND_BOOKMARK_FOLDER_ALL;
    payload: string;
}

export interface SearchBookmarkAction extends Action<BookmarkActions.SEARCH_BOOKMARK> {
    type: BookmarkActions.SEARCH_BOOKMARK;
    payload: string;
}

export type BookmarkActionType =
    | LoadBookmarkStateAction
    | LoadBookmarkStateSuccessAction
    | LoadBookmarkStateFailAction
    | SaveBookmarkStateAction
    | SaveBookmarkStateSuccessAction
    | SaveBookmarkStateFailAction
    | ToggleExpandBookmarkFolderAction
    | ToggleExpandBookmarkFolderAllAction
    | SearchBookmarkAction;

export const LoadBookmarkState = () => ({
    type: BookmarkActions.LOAD_BOOKMARK_STATE,
});

export const LoadBookmarkStateSuccess = (payload: BookmarkState) => ({
    type: BookmarkActions.LOAD_BOOKMARK_STATE_SUCCESS,
    payload: payload
});

export const LoadBookmarkStateFail = () => ({
    type: BookmarkActions.LOAD_BOOKMARK_STATE_FAIL,
});

export const SaveBookmarkState = () => ({
    type: BookmarkActions.SAVE_BOOKMARK_STATE,
});

export const SaveBookmarkStateSuccess = () => ({
    type: BookmarkActions.SAVE_BOOKMARK_STATE_SUCCESS,
});

export const SaveBookmarkStateFail = () => ({
    type: BookmarkActions.SAVE_BOOKMARK_STATE_FAIL,
});

export const toggleExpandBookmarkFolder = (payload: string) => ({
    type: BookmarkActions.TOGGLE_EXPAND_BOOKMARK_FOLDER,
    payload: payload
});

export const toggleExpandBookmarkFolderAll = () => ({
    type: BookmarkActions.TOGGLE_EXPAND_BOOKMARK_FOLDER_ALL
});

export const searchBookmark = (payload: string) => ({
    type: BookmarkActions.SEARCH_BOOKMARK,
    payload: payload
});


const INITIAL_STATE: BookmarkState = {
    folders: [],
    foldersFiltered: [],
    isAllExpanded: false,
    query: ''
};

export const bookmarkState = (
    state: BookmarkState = INITIAL_STATE, // defaultBookmarkState,
    action: BookmarkActionType
): BookmarkState => {
    switch (action.type) {

        case BookmarkActions.LOAD_BOOKMARK_STATE:
            return state;
        case BookmarkActions.LOAD_BOOKMARK_STATE_SUCCESS:
            return { ...state, ...action.payload };
        case BookmarkActions.LOAD_BOOKMARK_STATE_FAIL:
            return state;

        case BookmarkActions.SAVE_BOOKMARK_STATE:
            return state;
        case BookmarkActions.SAVE_BOOKMARK_STATE_SUCCESS:
            return state;
        case BookmarkActions.SAVE_BOOKMARK_STATE_FAIL:
            return state;

        case BookmarkActions.TOGGLE_EXPAND_BOOKMARK_FOLDER:
            const { folders, isAllExpanded } = toggleExpandFolder(
                state.folders,
                action.payload,
                state.isAllExpanded
            );

            return {
                ...state,
                folders: folders,
                foldersFiltered: filterBookmarks(folders, state.query),
                isAllExpanded: isAllExpanded
            };

        case BookmarkActions.TOGGLE_EXPAND_BOOKMARK_FOLDER_ALL:
            const folders2 = toggleExpandFolderAll(state.folders, !state.isAllExpanded);
            return {
                ...state,
                folders: folders2,
                foldersFiltered: filterBookmarks(folders2, state.query),
                isAllExpanded: !state.isAllExpanded
            };

        case BookmarkActions.SEARCH_BOOKMARK:
            return {
                ...state,
                query: action.payload,
                foldersFiltered: filterBookmarks(state.folders, action.payload)
            };

        default:
            return state;
    }
};


// Utils
const parseFolder = (bookmark: chrome.bookmarks.BookmarkTreeNode): Folder => ({
    index: bookmark.index,
    title: bookmark.title,
    url: bookmark.url,
    dateGroupModified: bookmark.dateGroupModified,
    id: bookmark.id,
    parentId: bookmark.parentId,
    unmodifiable: bookmark.unmodifiable,
    children: [],
    isExpanded: false
});

const parseBookmark = (bookmark: chrome.bookmarks.BookmarkTreeNode): Bookmark => ({
    index: bookmark.index,
    title: bookmark.title,
    url: bookmark.url,
    dateGroupModified: bookmark.dateGroupModified,
    id: bookmark.id,
    parentId: bookmark.parentId,
    unmodifiable: bookmark.unmodifiable
});

const buildFolderStructure = (bookmarks: chrome.bookmarks.BookmarkTreeNode[]) => {
    const allFolders: Folder[] = [];
    const allBookmarks: any = [];

    const parseBookmarkNodes = (nodes: chrome.bookmarks.BookmarkTreeNode[]) => {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.children) {
                if (node.children.length > 0) {
                    allFolders.push(parseFolder(node));
                    parseBookmarkNodes(node.children);
                }
            } else {
                allBookmarks.push(parseBookmark(node));
            }
        }
    };
    parseBookmarkNodes(bookmarks);

    return allFolders.map((folder: any) => {
        folder.children = allBookmarks.filter((b: any) => b.parentId === folder.id);
        return folder;
    });
}

const filterBookmarks = (folders: any, query: string = ''): Folder[] => {
    const copy = cloneDeep(folders);
    if (!query) { return copy; }

    if (query) {
        for (let i = 0; i < copy.length; i++) {
            copy[i].children = copy[i].children.filter((child: any) => {
                return child.title.toUpperCase().search(query.toUpperCase()) !== -1 ||
                       child.url.toUpperCase().search(query.toUpperCase()) !== -1;
            });
        }
    }
    return copy;
}

const toggleExpandFolder = (
    folders: Folder[],
    folderId: string,
    isAllExpanded: boolean
) => {
    let expanded = 0;
    let notExpanded = 0;

    folders.forEach((folder: Folder) => {
        if (folder.id === folderId) {
            folder.isExpanded = !folder.isExpanded;
        }
        if (folder.isExpanded === true) {
            expanded++
        } else if (folder.isExpanded === false) {
            notExpanded++;
        }
    });

    if (folders.length === expanded) {
        isAllExpanded = true;
    } else if (folders.length === notExpanded) {
        isAllExpanded = true;
    }

    return {
        folders: folders,
        isAllExpanded: isAllExpanded
    };
}

const toggleExpandFolderAll = (folders: Folder[], isAllExpanded: boolean) => {
    return folders.map((folder: Folder) => {
        folder.isExpanded = isAllExpanded;
        return folder;
    });
}

// ASYNC ACTIONS
export const LoadBookmarkStateAsync = () => {
    return (dispatch: any, getState: any) => {
        dispatch(LoadBookmarkState());

        return api.bookmark.getBookmarks().then((data: any[]) => {
            return api.storage.getItems(bookmarkStateKey, defaultBookmarkState)
                .then((bookmarkState: BookmarkState) => {
                    const folders = buildFolderStructure(data[0].children);
                    const foldersFiltered = filterBookmarks(folders, bookmarkState.query);

                    const state: BookmarkState = {
                        folders: folders,
                        foldersFiltered: foldersFiltered,
                        isAllExpanded: bookmarkState.isAllExpanded,
                        query: '',
                    };

                    return dispatch(LoadBookmarkStateSuccess(state));
                })
                .catch((err: any) => {
                    console.warn('[BOOKMARK] error', err);
                    return dispatch(LoadBookmarkStateFail());
                });
        });
    };
}

/// SAGA
const saveBookmarkStateSaga = takeEvery([
    BookmarkActions.TOGGLE_EXPAND_BOOKMARK_FOLDER,
    BookmarkActions.TOGGLE_EXPAND_BOOKMARK_FOLDER_ALL,
    // BookmarkActions.SEARCH_BOOKMARK,
],
    function* () {
        const rootState = yield select();
        yield put(SaveBookmarkState());

        const bookmarkState = {
            isAllExpanded: rootState.bookmarkState.isAllExpanded,
            // query: rootState.bookmarkState.query,
        };

        const saved = yield api.storage.setItems(bookmarkStateKey, bookmarkState);

        if (saved) {
            yield put(SaveBookmarkStateSuccess());
        } else {
            yield put(SaveBookmarkStateFail());
        }
    });

export const bookmarkSaga = [
    saveBookmarkStateSaga,
];
