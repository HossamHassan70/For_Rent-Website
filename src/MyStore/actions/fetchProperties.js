import axios from 'axios';

export const fetchProperties = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_PROPERTIES_REQUEST' });
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=100');
      dispatch({
        type: 'FETCH_PROPERTIES_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_PROPERTIES_FAILURE',
        payload: error.message,
      });
    }
  };
};