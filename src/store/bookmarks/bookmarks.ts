import { Action } from 'redux';
import BrowserApi from 'api/BrowserApi';

export interface BookmarkState {
    bookmarks: any;
    bookmarksFiltered: any;
    query: string;
}

export enum BookmarkActions {
    LOAD_BOOKMARK = 'BOOKMARK/LOAD_BOOKMARK',
    LOAD_BOOKMARK_SUCCESS = 'BOOKMARK/LOAD_BOOKMARK_SUCCESS',
    LOAD_BOOKMARK_FAIL = 'BOOKMARK/LOAD_BOOKMARK_FAIL',
    SEARCH_BOOKMARK = 'BOOKMARK/SEARCH_BOOKMARK',
}

export interface LoadBookmarkAction extends Action<BookmarkActions.LOAD_BOOKMARK> {
    type: BookmarkActions.LOAD_BOOKMARK;
}

export interface LoadBookmarkSuccessAction extends Action<BookmarkActions.LOAD_BOOKMARK_SUCCESS> {
    type: BookmarkActions.LOAD_BOOKMARK_SUCCESS;
    payload: any;
}

export interface LoadBookmarkFailAction extends Action<BookmarkActions.LOAD_BOOKMARK_FAIL> {
    type: BookmarkActions.LOAD_BOOKMARK_FAIL;
}

export interface SearchBookmarkAction extends Action<BookmarkActions.SEARCH_BOOKMARK> {
    type: BookmarkActions.SEARCH_BOOKMARK;
    payload: string;
}

export type BookmarkActionType =
    | LoadBookmarkAction
    | LoadBookmarkSuccessAction
    | LoadBookmarkFailAction
    | SearchBookmarkAction;

export const loadBookmark = () => ({
    type: BookmarkActions.LOAD_BOOKMARK,
});

export const loadBookmarkSuccess = (payload: any) => ({
    type: BookmarkActions.LOAD_BOOKMARK_SUCCESS,
    payload: payload
});

export const loadBookmarkFail = () => ({
    type: BookmarkActions.LOAD_BOOKMARK_FAIL,
});


export const searchBookmark = (payload: string) => ({
    type: BookmarkActions.SEARCH_BOOKMARK,
    payload: payload
});


const INITIAL_STATE: BookmarkState = {
    bookmarks: null,
    bookmarksFiltered: null,
    query: '',
};

export const bookmarkState = (
    state: BookmarkState = INITIAL_STATE, // defaultBookmarkState,
    action: BookmarkActionType
): BookmarkState => {
    switch (action.type) {

        case BookmarkActions.LOAD_BOOKMARK:
            return state;

        case BookmarkActions.LOAD_BOOKMARK_SUCCESS:
            return { ...state, bookmarks: action.payload };

        case BookmarkActions.LOAD_BOOKMARK_FAIL:
            return state;

        case BookmarkActions.SEARCH_BOOKMARK:
            return {
                ...state,
                query: action.payload,
                bookmarksFiltered: state.bookmarks
            };

        default:
            return state;
    }
};

// ASYNC ACTIONS
export const loadBookmarkAsync = () => {
    return async (dispatch: any, getState: any) => {
        dispatch(loadBookmark());

      /*   return new Promise((resolve, reject) => {
            BrowserApi.getBookmarks()
                .then((bookmarks: any) => {

                    // const parseBookmarks = (bk) => {
                    //     if (bookmarks.children) {
                    //         return parseBookmarks
                    //     }
                    //     return bookmarks
                    // }

                    resolve(
                        dispatch(loadBookmarkSuccess(bookmarks))
                    );
                })
                .catch((err: any) => {
                    reject(
                        dispatch(loadBookmarkFail())
                    );
                });
        }) */

         return BrowserApi.getBookmarksTree()
             .then((bookmarks: any) => {

                const parse = (node: any) => {
                    if (!node.title && node.url) {
                        node.title = node.url
                    }

                    if (node.children) {
                        node.expanded = false;
                        for (let i = 0; i < node.children.length; i++) {
                            parse(node.children[i])
                        }
                    } else {
                        node.visible = true;
                    }
                }

                parse(bookmarks[0]);

                bookmarks.title = 'Root'
                bookmarks[0].children[0].expanded = true;
                bookmarks[0].children[1].expanded = true;

                return dispatch(loadBookmarkSuccess(bookmarks));
             })
             .catch((err: any) => dispatch(loadBookmarkFail()));

    };
}
