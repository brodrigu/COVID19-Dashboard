import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import data, { dataSagas } from './data';
import localState, { localStateSagas } from './localState';

export default combineReducers({
    data,
    localState,
});

export function* rootSaga() {
    yield all([
        dataSagas(),
        localStateSagas(),
    ]);
}
