const initialState = {
    isEmailVerified: false,
};

const verifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_EMAIL_VERIFICATION':
            return {
                ...state,
                isEmailVerified: action.payload,
            };
        default:
            return state;
    }
};

export default verifyReducer;
