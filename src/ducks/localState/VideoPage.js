import { createAction, handleActions } from 'redux-actions';

// Action creators
export const setActiveTab = createAction('VideoPage/setActiveTab');
export const setDisplayedProduct = createAction('VideoPage/setDisplayedProduct');

// Reducers
export default handleActions({
    [setActiveTab](state, { payload }) {
        return { ...state, activeTab: payload };
    },
    [setDisplayedProduct](state, { payload }) {
        return { ...state, displayedProduct: payload };
    },
}, {
    activeTab: 1,
    displayedProduct: {},
});

// Selectors
export const getActiveTab = state => state.activeTab;
