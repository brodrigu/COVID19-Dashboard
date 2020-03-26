import { createAction, handleActions } from 'redux-actions';

// Action creators
export const triggerError = createAction('Errors/triggerError');
export const clearError = createAction('Errors/clearError');

// Reducers
export default handleActions({
    [clearError](state) {
        return { ...state, errorMessage: '', isOpen: false };
    },
    [triggerError](state, { payload }) {
        return { ...state, errorMessage: payload, isOpen: true };
    },
}, {
    errorMessage: '',
    isOpen: false,
});

// Selectors
export const getActiveTab = state => state.activeTab;
