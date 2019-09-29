import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { loadBookmarkAsync } from './bookmarks/bookmarks';
import { sidebarSaga, loadSidebarStateAsync } from './sidebar/sidebar';
import { pictureSaga, loadPictureStateAsync, getRandomPictureAsync } from './picture/picture';
import { uiSaga, loadUIStateAsync } from './ui/ui';

// Sagas
const rootSaga = function* () {
    yield all([
        ...pictureSaga,
        ...sidebarSaga,
        ...uiSaga,
    ]);
};

// Middlewares
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({ collapsed: true });

const middlewares = process.env.NODE_ENV === 'production'
    ? applyMiddleware(sagaMiddleware, thunk)
    : applyMiddleware(sagaMiddleware, thunk, logger);

const composeEnhancers = (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE
    ? (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE
    : compose;

// Store
const store = createStore(
    rootReducer,
    composeEnhancers(middlewares)
);

sagaMiddleware.run(rootSaga);
// store.dispatch<any>(loadSearchStateAsync());
store.dispatch<any>(getRandomPictureAsync());

store.dispatch<any>(loadPictureStateAsync());
store.dispatch<any>(loadBookmarkAsync());
store.dispatch<any>(loadSidebarStateAsync());
store.dispatch<any>(loadUIStateAsync());

export default store;
