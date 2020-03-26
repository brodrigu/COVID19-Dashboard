import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import model, { watchCalculateModelData } from './model';

export default combineReducers({
    model,
});

export function* dataSagas() {
    yield all([
        watchCalculateModelData(),
    ]);
}
