import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import Errors from './Errors';

export default combineReducers({
    Errors,
});

export function* localStateSagas() {
    yield all([
    ]);
}
