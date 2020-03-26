/* eslint-env jest */
import configureStore from 'redux-mock-store';

// Actions to be tested
import * as VideoPageDuck from '../VideoPage';

const mockStore = configureStore();
const store = mockStore();

describe('VideoPage Actions', () => {
    beforeEach(() => {
        store.clearActions();
    });

    for (const action of [
        'setActiveTab',
        'setDisplayedProduct',
    ]) {
        test(`${action} test`, () => {
            store.dispatch(VideoPageDuck[action]());
            expect(store.getActions()).toMatchSnapshot();
        });
    }
});

describe('VideoPage Reducers', () => {
    beforeEach(() => {
    });

    test('initial state', () => {
        const action = { type: 'dummy_action' };
        expect(VideoPageDuck.default(undefined, action)).toMatchSnapshot();
    });

    test('setActiveTab', () => {
        const action = { payload: 8, type: `${VideoPageDuck.setActiveTab}` };
        expect(VideoPageDuck.default(undefined, action)).toMatchSnapshot();
    });

    test('setDisplayedProduct', () => {
        const action = { payload: 'myProduct', type: `${VideoPageDuck.setDisplayedProduct}` };
        expect(VideoPageDuck.default(undefined, action)).toMatchSnapshot();
    });
});
