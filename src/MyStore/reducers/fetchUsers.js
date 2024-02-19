const INITIAL_VALUE = {
    users: [],
    error: '',
};

const usersReducer = (state = INITIAL_VALUE, action) => {
    switch (action.type) {
        case 'FETCH_USERS_REQUEST':
            return {
                ...state,
            };
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                users: action.payload,
                error: '',
            };
        case 'FETCH_USERS_FAILURE':
            return {
                ...state,
                users: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default usersReducer;