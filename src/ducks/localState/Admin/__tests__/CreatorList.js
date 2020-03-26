/* eslint-env jest */
import configureStore from 'redux-mock-store';
import { takeEvery } from 'redux-saga/effects';

// Actions to be tested
import * as CreatorListDuck from '../CreatorList';
import { fetchCreatorListRequest } from '../../../data/creatorList';

const mockStore = configureStore();
const store = mockStore();

describe('CreatorList Actions', () => {
    beforeEach(() => {
        store.clearActions();
    });

    for (const action of [
        'setPageNum',
    ]) {
        test(`${action} test`, () => {
            store.dispatch(CreatorListDuck[action]());
            expect(store.getActions()).toMatchSnapshot();
        });
    }
});

describe('CreatorList Reducers', () => {
    beforeEach(() => {
    });

    test('initial state', () => {
        const action = { type: 'dummy_action' };
        expect(CreatorListDuck.default(undefined, action)).toMatchSnapshot();
    });

    test('setPageNum', () => {
        const action = { payload: 4, type: `${CreatorListDuck.setPageNum}` };
        expect(CreatorListDuck.default(undefined, action)).toMatchSnapshot();
    });
});


describe('CreatorList Sagas', () => {
    beforeEach(() => {
    });

    test('watchFetchCreatorListRequest', () => {
        const gen = CreatorListDuck.watchFetchCreatorListRequest();
        expect(gen.next().value).toEqual(takeEvery(
            [CreatorListDuck.setPageNum],
            fetchCreatorListRequest,
        ));
        expect(gen.next().done).toEqual(true);
    });
});
