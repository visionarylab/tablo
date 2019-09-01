import { combineReducers, Reducer } from 'redux';
import { searchState, SearchState } from './search';
import { pictureState, PictureState } from './picture';
import { bookmarkState, BookmarkState } from './bookmarks';
import { settingsState, SettingsState } from './settings';

export interface RootState {
  searchState: SearchState;
  pictureState: PictureState;
  bookmarkState: BookmarkState;
  settingsState: SettingsState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  searchState,
  pictureState,
  bookmarkState,
  settingsState
});

export default rootReducer;