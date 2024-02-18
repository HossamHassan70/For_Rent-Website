import axios from 'axios';

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch({ type: 'FETCH_USERS_REQUEST' });

        return axios.get('https://dummyjson.com/users')
            .then(response => {
                dispatch({
                    type: 'FETCH_USERS_SUCCESS',
                    payload: response.data,
                });
            })
            .catch(error => {
                dispatch({
                    type: 'FETCH_USERS_FAILURE',
                    payload: error.message,
                });
            });
    };
};