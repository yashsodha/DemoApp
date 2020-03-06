import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import promise from 'redux-promise-middleware';

const appReducer = combineReducers(reducer);

/**
 * Root Reducer method
 * @param {object} state
 * @param {object} action
 * @return {function} function
 */
const Store = createStore(
    appReducer,
    applyMiddleware(thunk, promise)
);

export default Store;

