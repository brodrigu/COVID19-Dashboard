/* eslint-env jest */
import configureStore from 'redux-mock-store';
import { takeEvery } from 'redux-saga/effects';
import * as client from '../../../../client';
// Actions to be tested
import * as MissingProductModalDuck from '../MissingProductModal';

const mockStore = configureStore();
const store = mockStore();


describe('MissingProductModal Actions', () => {
    beforeEach(() => {
        store.clearActions();
    });

    for (const action of [
        'openModal',
        'closeModal',
        'searchBrand',
        'searchProduct',
        'updateMissingProduct',
        'submitMissingProductRequest',
        'submitMissingProductResponse',
    ]) {
        test(`${action} test`, () => {
            store.dispatch(MissingProductModalDuck[action]());
            expect(store.getActions()).toMatchSnapshot();
        });
    }
});

describe('MissingProductModal Reducers', () => {
    beforeEach(() => {
    });

    test('initial state', () => {
        const action = { type: 'dummy_action' };
        expect(MissingProductModalDuck.default(undefined, action)).toMatchSnapshot();
    });

    test('closeModal', () => {
        const action = { type: `${MissingProductModalDuck.closeModal}` };
        expect(MissingProductModalDuck.default({ modalIsOpen: true }, action)).toMatchSnapshot();
    });

    test('openModal', () => {
        const appearanceSecond = 123;
        const action = { payload: appearanceSecond, type: `${MissingProductModalDuck.openModal}` };
        expect(MissingProductModalDuck.default({ modalIsOpen: false }, action)).toMatchSnapshot();
    });

    test('submitMissingProductResponse', () => {
        const action = { type: 'submitMissingProductResponse' };
        expect(MissingProductModalDuck.default(undefined, action)).toMatchSnapshot();
    });

    test('updateMissingProduct', () => {
        const update = { key: 'foo', value: 'bar' };
        const action = { payload: update, type: `${MissingProductModalDuck.updateMissingProduct}` };
        expect(MissingProductModalDuck.default(undefined, action)).toMatchSnapshot();
    });
});


describe('MissingProductModal Sagas', () => {
    beforeEach(() => {
    });

    test('watchSubmitMissingProductRequest', () => {
        const gen = MissingProductModalDuck.watchSubmitMissingProductRequest();
        expect(gen.next().value).toEqual(takeEvery(
            [MissingProductModalDuck.submitMissingProductRequest],
            MissingProductModalDuck.workSubmitMissingProductRequest,
        ));
        expect(gen.next().done).toEqual(true);
    });

    test('workSubmitMissingProductRequest', () => {
        const productWithIds = {
            appearanceSecond: 123,
            brand: { id: 1 },
            product: { id: 2 },
            productVariantName: 'foo',
        };
        const apiResponse = {
            appearanceSecond: productWithIds.appearanceSecond,
            brandName: productWithIds.brand.label,
            missingProductId: 1,
            productName: productWithIds.product.label,
            productVariantName: productWithIds.productVariantName,
        };

        client.submitMissingProduct = jest.fn().mockReturnValue(apiResponse);

        const gen = MissingProductModalDuck.workSubmitMissingProductRequest(
            MissingProductModalDuck.submitMissingProductRequest(productWithIds),
        );
        expect(gen.next().value).toEqual(apiResponse);
        expect(gen.next(apiResponse).value).toMatchSnapshot();
        expect(gen.next().value).toMatchSnapshot();
        expect(gen.next().done).toEqual(true);
    });
});
