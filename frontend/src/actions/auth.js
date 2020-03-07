import axios from 'axios';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';
export const SET_ERRORS = 'SET_ERRORS';
export const SET_LOADING = 'SET_LOADING';

export function setToken(token) {
    return {
        type: SET_TOKEN,
        token
    };
}

export function setUser(user) {
    return {
        type: SET_USER,
        user
    };
}

export function setAuthErrors(errors) {
    return {
        type: SET_ERRORS,
        errors
    };
}

export function setLoading(loading) {
    return {
        type: SET_LOADING,
        loading
    };
};

export function createUser(userInfo) {
    const { email, firstName, lastName, password } = userInfo;

    return function(dispatch) {
        dispatch({ type: SET_LOADING, loading: true });
        
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/user/`,
            data: {
                email,
                firstName,
                lastName,
                password
            }
        }).then(({ data }) => {
            dispatch({ type: SET_USER, user: data.user });
            dispatch(logIn({ email, password }));
            dispatch({ type: SET_LOADING, loading: false });
        }).catch(({ response }) => {
            const { errors } = response.data;
            dispatch({ type: SET_LOADING, loading: false });
            dispatch({ type: SET_ERRORS, errors });
        });
    }
}

export function logIn(userInfo) {
    const { email, password } = userInfo;

    return function(dispatch) {
        dispatch({ type: SET_LOADING, loading: true });

        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/user/login/`,
            data: {
                email,
                password
            }
        }).then(({ data }) => {
            dispatch({ type: SET_USER, user: data.user });
            dispatch({ type: SET_TOKEN, token: data.token });
            dispatch({ type: SET_LOADING, loading: false });
        }).catch(({ response }) => {
            const { errors } = response.data;
            dispatch({ type: SET_LOADING, loading: false });
            dispatch({ type: SET_ERRORS, errors });
        });
    }
}