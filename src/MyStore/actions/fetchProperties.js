import axios from 'axios';

export const fetchProperties = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_PROPERTIES_REQUEST' });
    try {
      return axios.get('https://dummyjson.com/products?limit=100')
        .then(response => {
          dispatch({
            type: 'FETCH_PROPERTIES_SUCCESS',
            payload: response.data,
          });
        })
        .catch(error => {
          dispatch({
            type: 'FETCH_PROPERTIES_FAILURE',
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: 'FETCH_PROPERTIES_FAILURE',
        payload: error.message,
      });
    }
  };
};