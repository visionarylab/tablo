import { combineReducers, Reducer } from 'redux';
import { searchState, SearchState } from './search';
import { pictureState, PictureState } from './picture';
import { bookmarkState, BookmarkState } from './bookmarks';

export interface RootState {
  searchState: SearchState;
  pictureState: PictureState;
  bookmarkState: BookmarkState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  searchState,
  pictureState,
  bookmarkState
});

export default rootReducer;