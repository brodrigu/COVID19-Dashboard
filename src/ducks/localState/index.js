import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import ModelParameters from './ModelParameters';

export default combineReducers({
    ModelParameters,
});

export function* localStateSagas() {
    yield all([
    ]);
}
