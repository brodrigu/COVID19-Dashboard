import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import model, { watchCalculateModelData } from './model';
import history, { watchRequestHistoricalData } from './history';

export default combineReducers({
    history,
    model,
});

export function* dataSagas() {
    yield all([
        watchCalculateModelData(),
        watchRequestHistoricalData(),
    ]);
}
