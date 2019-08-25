import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import { searchSaga, loadSearchStateAsync } from './search';
import { pictureSaga, loadPictureStateAsync, getRandomPictureAsync } from './picture';
import { all } from 'redux-saga/effects';
import thunk from 'redux-thunk';
import { bookmarkSaga, LoadBookmarkStateAsync } from './bookmarks';

// Sagas
const rootSaga = function*() {
  yield all([
    ...searchSaga,
    ...pictureSaga,
    ...bookmarkSaga,
  ]);
};

// Middlewares
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({ collapsed: true });
const middlewares = applyMiddleware(
    sagaMiddleware,
    thunk,
    logger,
);
const composeEnhancers = (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE
    ? (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE
    : compose;

// Store
const store = createStore(
  rootReducer,
  composeEnhancers(middlewares)
);

sagaMiddleware.run(rootSaga);
store.dispatch<any>(loadSearchStateAsync());
store.dispatch<any>(loadPictureStateAsync());
store.dispatch<any>(getRandomPictureAsync());
store.dispatch<any>(LoadBookmarkStateAsync());

export default store;
