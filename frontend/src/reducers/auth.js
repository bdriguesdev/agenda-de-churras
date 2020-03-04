export const authReducer = (state=null, action) => {
    switch(action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};