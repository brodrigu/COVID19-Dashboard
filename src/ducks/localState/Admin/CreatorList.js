import { createAction, handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { fetchCreatorListRequest } from '../../data/creatorList';

// Action creators
export const setPageNum = createAction('Admin/CreatorList/setPageNum');

const initialState = {
    pageNum: 1,
};

// Reducers
export default handleActions({
    [setPageNum](state, { payload }) {
        return { ...state, pageNum: payload };
    },
}, initialState);

export function* watchFetchCreatorListRequest() {
    yield takeEvery([setPageNum], fetchCreatorListRequest);
}
