const initialState = {
    results: [],
    loading: false,
    error: null,
    searchQuery: '',
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_PROPERTIES_REQUEST":
            return { ...state, loading: true, error: null };
        case "SEARCH_PROPERTIES_SUCCESS":
            // console.log('Search results:', action.payload);
            return { ...state, results: action.payload, loading: false };
        case "SEARCH_PROPERTIES_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default searchReducer;
