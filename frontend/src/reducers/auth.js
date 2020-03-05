import {
    SET_TOKEN,
    SET_USER,
    SET_LOADING,
    SET_ERRORS
} from '../actions/auth';

const initialState = {
    token: null,
    user: null,
    loading: null,
    errors: null
};

export const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: action.errors
            }
        default:
            return state;
    }
};