import axios from 'axios';

export const fetchReviews = () => {
    return (dispatch) => {
        dispatch({ type: 'FETCH_REVIEWS_REQUEST' });
        try {
            return axios.get('http://localhost:8000/reviews/')
                .then(response => {
                    dispatch({
                        type: 'FETCH_REVIEWS_SUCCESS',
                        payload: response.data,
                    });
                })
                .catch(error => {
                    dispatch({
                        type: 'FETCH_REVIEWS_FAILURE',
                        payload: error.message,
                    });
                });
        } catch (error) {
            dispatch({
                type: 'FETCH_REVIEWS_FAILURE',
                payload: error.message,
            });
        }
    };
};

export const addReview = (reviewData) => {
    return (dispatch) => {
        dispatch({ type: 'ADD_REVIEW_REQUEST' });
        axios.post('http://localhost:8000/reviews/', reviewData)
            .then(response => {
                dispatch({
                    type: 'ADD_REVIEW_SUCCESS',
                    payload: response.data,
                });
            })
            .catch(error => {
                dispatch({
                    type: 'ADD_REVIEW_FAILURE',
                    payload: error.message,
                });
            });
    };
};

export const editReview = (reviewId, reviewData) => {
    return (dispatch) => {
        dispatch({ type: 'EDIT_REVIEW_REQUEST' });
        axios.put(`http://localhost:8000/reviews/${reviewId}/`, reviewData)
            .then(response => {
                dispatch({
                    type: 'EDIT_REVIEW_SUCCESS',
                    payload: response.data,
                });
            })
            .catch(error => {
                dispatch({
                    type: 'EDIT_REVIEW_FAILURE',
                    payload: error.message,
                });
            });
    };
};

export const deleteReview = (reviewId) => {
    return (dispatch) => {
        dispatch({ type: 'DELETE_REVIEW_REQUEST' });
        axios.delete(`http://localhost:8000/reviews/${reviewId}/`)
            .then(() => {
                dispatch({
                    type: 'DELETE_REVIEW_SUCCESS',
                    payload: reviewId,
                });
            })
            .catch(error => {
                dispatch({
                    type: 'DELETE_REVIEW_FAILURE',
                    payload: error.message,
                });
            });
    };
};