import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import CreatorList, { watchFetchCreatorListRequest } from './CreatorList';
import MissingProductModal, { watchSubmitMissingProductRequest } from './MissingProductModal';

export default combineReducers({
    CreatorList,
    MissingProductModal,
});

export function* adminSagas() {
    yield all([
        watchFetchCreatorListRequest(),
        watchSubmitMissingProductRequest(),
    ]);
}
