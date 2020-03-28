import { createAction, handleActions } from 'redux-actions';
import conf from '../../conf';

// Action creators
export const update = createAction('ModelParameters/update');

// Reducers
export default handleActions({
    [update](state, { payload }) {
        return { ...state, ...payload };
    },
}, conf.modelDefaults);

// Selectors
export const getActiveTab = state => state.activeTab;
