import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/authAction";

const initialState = {
  isLoggedIn: false,
  refreshToken: null, 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        refreshToken: action.payload, 
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        refreshToken: null,
      };
    case LOGOUT:
      return {
        ...initialState, 
      };
    default:
      return state;
  }
};

export default authReducer;