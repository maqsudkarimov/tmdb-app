import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

import rootReducer from './reducers';

let middlewares = [
	applyMiddleware(thunk)
];

if (process.env.NODE_ENV === 'development') {
	middlewares = [
		applyMiddleware(thunk, logger),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	];
}

const configureStore = createStore(
	rootReducer,
	compose(...middlewares)
);

export default configureStore;