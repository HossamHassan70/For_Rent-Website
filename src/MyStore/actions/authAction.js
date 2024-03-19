import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (refreshToken) => ({
  type: LOGIN_SUCCESS,
  payload: refreshToken,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginAsync = (username, password) => {
  return (dispatch) => {
    return axios
      .post("http://127.0.0.1:8000/login/", { username, password })
      .then((response) => {
        const { refresh } = response.data;
        // sessionStorage.setItem("refreshToken", refresh);
        dispatch(loginSuccess(refresh));
      })
      .catch((error) => {
        console.error("Error during login:", error);
        dispatch(loginFailure());
      });
  };
};
