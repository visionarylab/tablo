import { combineReducers, Reducer } from 'redux';
import { searchState, SearchState } from './search';
import { pictureState, PictureState } from './picture';
import { bookmarkState, BookmarkState } from './bookmarks';
import { uiState, UIState } from './ui';

export interface RootState {
  searchState: SearchState;
  pictureState: PictureState;
  bookmarkState: BookmarkState;
  uiState: UIState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  searchState,
  pictureState,
  bookmarkState,
  uiState,
});

export default rootReducer;