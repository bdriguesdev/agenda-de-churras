import {
    SET_CHURRASCO,
    SET_CHURRASCOS,
    SET_CHURRASCO_LOADING,
    SET_CHURRASCO_ERRORS
} from '../actions/churrasco'

const initialState = {
    churrasco: null,
    churrascos: null,
    errors: null,
    loading: false
};

export const churrascoReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_CHURRASCO:
            return {
                ...state,
                churrasco: action.churrasco
            };
        case SET_CHURRASCOS:
            return {
                ...state,
                churrascos: action.churrascos
            };
        case SET_CHURRASCO_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case SET_CHURRASCO_ERRORS:
            return {
                ...state,
                errors: action.errors
            };
        default:
            return state;
    }
};