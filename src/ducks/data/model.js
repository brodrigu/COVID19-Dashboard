import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import { calculateData } from '~services/covid-model';

// Action creators
export const calculateModelData = createAction('data/model/calculateModelData');
export const updateModelData = createAction('data/model/updateModelData');

// Reducers
export default handleActions({
    [updateModelData](state, { payload }) {
        return payload;
    },
}, []);

// Sagas

// list
export function* workCalculateModelData() {
    yield put(updateModelData(calculateData({ daysToCalculate: 100 })));
}
export function* watchCalculateModelData() {
    yield takeEvery([calculateModelData], workCalculateModelData);
}
