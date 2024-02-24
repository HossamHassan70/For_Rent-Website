const initialState = {
    products: [],
    loading: false,
    error: null,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_REGION_REQUEST":
            return { ...state, loading: true, error: null };
        case "SEARCH_REGION_SUCCESS":
            return { ...state, products: action.payload, loading: false };
        case "SEARCH_REGION_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default searchReducer;
