import { combineReducers, Reducer } from 'redux';
import { pictureState, PictureState } from './picture';
import { sidebarState, SidebarState } from './Sidebar';
import { bookmarkState, BookmarkState } from './bookmarks';
import { uiState, UIState } from './ui';
import { searchState, SearchState } from './search';

export interface RootState {
    pictureState: PictureState;
    sidebarState: SidebarState;
    bookmarkState: BookmarkState;
    uiState: UIState;
    searchState: SearchState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    pictureState,
    sidebarState,
    bookmarkState,
    uiState,
    searchState,
});

export default rootReducer;
