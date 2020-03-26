import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import * as client from '../../../client';
import { addProductMention } from '../../data/content';

// Action creators
export const openModal = createAction('Admin/MissingProductModal/open');
export const closeModal = createAction('Admin/MissingProductModal/close');
export const searchBrand = createAction('Admin/MissingProductModal/searchBrand');
export const searchProduct = createAction('Admin/MissingProductModal/searchProduct');
export const updateMissingProduct = createAction('Admin/MissingProductModal/update');
export const submitMissingProductRequest = createAction('Admin/MissingProductModal/submitMissingProductRequest');
export const submitMissingProductResponse = createAction('Admin/MissingProductModal/submitMissingProductResponse');

const initialState = {
    appearanceSecond: 0,
    brand: {},
    modalIsOpen: false,
    product: {},
    productVariantName: '',
};

// Reducers
export default handleActions({
    [closeModal](state) {
        return { ...state, modalIsOpen: false };
    },
    [openModal](state, { payload }) {
        return {
            ...state,
            appearanceSecond: payload.appearanceSecond,
            modalIsOpen: true,
        };
    },
    [submitMissingProductResponse]() {
        return initialState;
    },
    [updateMissingProduct](state, { payload }) {
        return { ...state, [payload.key]: payload.value };
    },
}, initialState);

export function* workSubmitMissingProductRequest(action) {
    const {
        brand,
        product,
        productVariantName,
        appearanceSecond,
    } = action.payload;
    const data = {
        productVariantName,
    };

    if (brand.id) {
        data.brandId = brand.id;
    } else {
        data.brandName = brand.label.trim();
    }

    if (product.id) {
        data.productId = product.id;
    } else {
        data.productName = product.label.trim();
    }

    const response = yield client.submitMissingProduct(data);
    yield put(submitMissingProductResponse(response));

    yield put(addProductMention({
        appearanceSecond,
        brandName: brand.label,
        missingProductId: response.id,
        productName: product.label,
        productVariantName,
    }));
}

export function* watchSubmitMissingProductRequest() {
    yield takeEvery([submitMissingProductRequest], workSubmitMissingProductRequest);
}
