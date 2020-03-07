import axios from 'axios';

export const SET_CHURRASCO = 'SET_CHURRASCO';
export const SET_CHURRASCOS = 'SET_CHURRASCOS';
export const SET_CHURRASCO_LOADING = 'SET_CHURRASCO_LOADING';
export const SET_CHURRASCO_ERRORS = 'SET_CHURRASCO_ERRORS';
export const SET_PARTICIPANT = 'SET_PARTICIPANT';
export const REMOVE_PARTICIPANTS = 'REMOVE_PARTICIPANTS';
export const SET_CHURRASCO_INSIDE_CHURRASCOS = 'SET_CHURRASCO_INSIDE_CHURRASCOS';

export function setChurrasco(churrasco) {
    return {
        type: SET_CHURRASCO,
        churrasco
    };
} 

export function setChurrascos(churrascos) {
    return {
        type: SET_CHURRASCOS,
        churrascos
    };
}

export function setLoading(loading) {
    return {
        type: SET_CHURRASCO_LOADING,
        loading
    };
}

export function setChurrascoErrors(errors) {
    return {
        type: SET_CHURRASCO_ERRORS,
        errors
    }
}

export function setParticipant(participant) {
    return {
        type: SET_PARTICIPANT,
        participant
    };
}

export function createChurrasco(churrascoInfo, token) {
    const { title, description, date, foodPrice, foodAndDrinkPrice } = churrascoInfo;

    return function(dispatch) {
        dispatch({ type: SET_CHURRASCO_LOADING, loading: true });
        
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/churrasco/`,
            headers: {
                Authorization: token
            },
            data: {
                title,
                description,
                date,
                foodPrice,
                foodAndDrinkPrice
            }
        }).then(({ data }) => {
            dispatch({ type: SET_CHURRASCO_INSIDE_CHURRASCOS, churrasco: data.churrasco });
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
        }).catch((err) => {
            console.log(err);
            // const { errors } = response.data;
            // dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
            // dispatch({ type: SET_CHURRASCO_ERRORS, errors });
        });
    }
}

export function getAllChurrascos() {

    return function(dispatch) {
        dispatch({ type: SET_CHURRASCO_LOADING, loading: true });
        
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/churrasco/`
        }).then(({ data }) => {
            dispatch({ type: SET_CHURRASCOS, churrascos: data.churrascos });
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
        }).catch(({ response }) => {
            const { errors } = response.data;
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
            dispatch({ type: SET_CHURRASCO_ERRORS, errors });
        });
    }
}

export function getChurrasco(churrascoId) {

    return function(dispatch) {
        dispatch({ type: SET_CHURRASCO_LOADING, loading: true });
        
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/churrasco/${churrascoId}`
        }).then(({ data }) => {
            dispatch({ type: SET_CHURRASCO, churrasco: data.churrasco });
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
        }).catch(({ response }) => {
            const { errors } = response.data;
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
            dispatch({ type: SET_CHURRASCO_ERRORS, errors });
        });
    }
}

export function editChurrasco(churrascoInfo, token) {
    const { title, description, date, foodPrice, foodAndDrinkPrice, churrascoId } = churrascoInfo;

    return function(dispatch) {
        dispatch({ type: SET_CHURRASCO_LOADING, loading: true });
        
        return axios({
            method: 'patch',
            headers: {
                Authorization: token
            },
            data: {
                title,
                description,
                date,
                foodPrice,
                foodAndDrinkPrice
            },
            url: `${process.env.REACT_APP_API_URL}/churrasco/${churrascoId}`
        }).then(({ data }) => {
            dispatch({ type: SET_CHURRASCO, churrasco: data.churrasco });
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
        }).catch(({ response }) => {
            const { errors } = response.data;
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
            dispatch({ type: SET_CHURRASCO_ERRORS, errors });
        });
    }
}

export function deleteChurrasco(churrascoId, token) {

    return function(dispatch) {
        dispatch({ type: SET_CHURRASCO_LOADING, loading: true });
        
        return axios({
            method: 'delete',
            headers: {
                Authorization: token
            },
            url: `${process.env.REACT_APP_API_URL}/churrasco/${churrascoId}`
        }).then(() => {
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
        }).catch(({ response }) => {
            const { errors } = response.data;
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
            dispatch({ type: SET_CHURRASCO_ERRORS, errors });
        });
    }
}

export function addParticipant(participantInfo, churrascoId, token) {
    const { name, value } = participantInfo;

    return function(dispatch) {
        dispatch({ type: SET_CHURRASCO_LOADING, loading: true });
        
        return axios({
            method: 'post',
            headers: {
                Authorization: token
            },
            data: {
                name,
                value,
                churrascoId
            },
            url: `${process.env.REACT_APP_API_URL}/participant/`
        }).then(({ data }) => {
            dispatch({ type: SET_PARTICIPANT, participant: data.participant });
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
        }).catch(({ response }) => {
            const { errors } = response.data;
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
            dispatch({ type: SET_CHURRASCO_ERRORS, errors });
        });
    }
}

export function deleteMultipleParticipant(participantIds, churrascoId, token) {

    return function(dispatch) {
        dispatch({ type: SET_CHURRASCO_LOADING, loading: true });
        
        return axios({
            method: 'delete',
            headers: {
                Authorization: token
            },
            data: {
                ids: participantIds,
                churrascoId
            },
            url: `${process.env.REACT_APP_API_URL}/participant/`
        }).then(({ data }) => {
            dispatch({ type: REMOVE_PARTICIPANTS, ids: data.ids })
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
        }).catch(({ response }) => {
            const { errors } = response.data;
            dispatch({ type: SET_CHURRASCO_LOADING, loading: false });
            dispatch({ type: SET_CHURRASCO_ERRORS, errors });
        });
    }
}