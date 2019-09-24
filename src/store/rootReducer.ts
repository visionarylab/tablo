import { combineReducers, Reducer } from 'redux';
import { pictureState, PictureState } from './picture/picture';
import { sidebarState, SidebarState } from './sidebar/sidebar';
import { bookmarkState, BookmarkState } from './bookmarks/bookmarks';
import { uiState, UIState } from './ui/ui';

export interface RootState {
    pictureState: PictureState;
    sidebarState: SidebarState;
    bookmarkState: BookmarkState;
    uiState: UIState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    pictureState,
    sidebarState,
    bookmarkState,
    uiState,
});

export default rootReducer;
