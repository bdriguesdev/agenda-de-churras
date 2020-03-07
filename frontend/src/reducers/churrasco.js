import {
    SET_CHURRASCO,
    SET_CHURRASCOS,
    SET_CHURRASCO_LOADING,
    SET_CHURRASCO_ERRORS,
    SET_PARTICIPANT,
    REMOVE_PARTICIPANTS,
    SET_CHURRASCO_INSIDE_CHURRASCOS
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
        case SET_PARTICIPANT:
            const participants = [...state.churrasco.participants, action.participant];
            const churrasco = {
                ...state.churrasco,
                participants
            };
            return {
                ...state,
                churrasco
            };
        case REMOVE_PARTICIPANTS:
            const newParticipants = state.churrasco.participants.filter(participant => {
                return action.ids.indexOf(participant._id) === -1
            });
            const newChurrasco = {
                ...state.churrasco,
                participants: newParticipants
            }; 
            return {
                ...state,
                churrasco: newChurrasco
            }
        case SET_CHURRASCO_INSIDE_CHURRASCOS:
            const newChurrascos = [];
            let newChurrascoIndex;

            for(let y = 0; y < state.churrascos.length; y++) {
                if(state.churrascos[y].date < action.churrasco.date) {
                    newChurrascos.push(state.churrascos[y]);
                } else {
                    newChurrascoIndex = y;
                    newChurrascos.push(action.churrasco);
                    break;
                }
            }

            for(let x = newChurrascoIndex; x < state.churrascos.length; x++) {
                newChurrascos.push(state.churrascos[x]);
            }

            if(!newChurrascoIndex) newChurrascos.push(action.churrasco);

            return {
                ...state,
                churrascos: newChurrascos
            }
        default:
            return state;
    }
};