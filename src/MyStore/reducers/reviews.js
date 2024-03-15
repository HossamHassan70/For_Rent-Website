const INITIAL_VALUE = {
    loading: false,
    reviews: [],
    error: '',
};

const reviewsReducer = (state = INITIAL_VALUE, action) => {
    switch (action.type) {
        case 'FETCH_REVIEWS_REQUEST':
        case 'ADD_REVIEW_REQUEST':
        case 'EDIT_REVIEW_REQUEST':
        case 'DELETE_REVIEW_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_REVIEWS_SUCCESS':
            return {
                ...state,
                loading: false,
                reviews: action.payload,
                error: '',
            };
        case 'ADD_REVIEW_SUCCESS':
            return {
                ...state,
                loading: false,
                reviews: [...state.reviews, action.payload],
                error: '',
            };
        case 'EDIT_REVIEW_SUCCESS':
            const editedReviewIndex = state.reviews.findIndex(review => review.id === action.payload.id);
            const updatedReviews = [...state.reviews];
            updatedReviews[editedReviewIndex] = action.payload;
            return {
                ...state,
                loading: false,
                reviews: updatedReviews,
                error: '',
            };
        case 'DELETE_REVIEW_SUCCESS':
            return {
                ...state,
                loading: false,
                reviews: state.reviews.filter(review => review.id !== action.payload),
                error: '',
            };
        case 'FETCH_REVIEWS_FAILURE':
        case 'ADD_REVIEW_FAILURE':
        case 'EDIT_REVIEW_FAILURE':
        case 'DELETE_REVIEW_FAILURE':
            return {
                ...state,
                loading: false,
                reviews: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reviewsReducer;
