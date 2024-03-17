import axios from 'axios';

export const fetchProperties = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_PROPERTIES_REQUEST' });
    try {
      return axios.get('http://localhost:8000/properties/') // Update the URL here
        .then(response => {
          dispatch({
            type: 'FETCH_PROPERTIES_SUCCESS',
            payload: response.data, // Assuming the data returned from the endpoint is an array of properties
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
