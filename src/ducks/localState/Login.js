import { createAction, handleActions } from 'redux-actions';

// Action creators
export const setRedirect = createAction('Login/setRedirect');

// Reducers
export default handleActions({
    [setRedirect](state, { payload }) {
        return { ...state, redirect: payload };
    },
}, {
    redirect: '',
});
