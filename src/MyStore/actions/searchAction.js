import axios from "axios";

export const searchAction = (query) => {
    return (dispatch) => {
        dispatch({ type: "SEARCH_REGION_REQUEST" });

        axios
            .get(`https://dummyjson.com/products/search?q=${query}`)
            .then((response) => {
                dispatch({ type: "SEARCH_REGION_SUCCESS", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "SEARCH_REGION_FAILURE", payload: error.message });
            });
    };
};
