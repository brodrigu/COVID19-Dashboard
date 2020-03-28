import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import { getDailyUSNumbers } from '~clients/covid-tracking';

// Action creators
export const requestHistoricalData = createAction('data/history/requestHistoricalData');
export const updateMHistoricalData = createAction('data/history/HistoricalData');

// Reducers
export default handleActions({
    [updateMHistoricalData](state, { payload }) {
        return payload;
    },
}, []);

// Sagas

// list
export function* workRequestHistoricalData() {
    const data = yield getDailyUSNumbers();
    yield put(updateMHistoricalData(data));
}
export function* watchRequestHistoricalData() {
    yield takeEvery([requestHistoricalData], workRequestHistoricalData);
}
