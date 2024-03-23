import axios from "axios";
import queryString from "query-string";

export const searchAction = (query) => {
    return (dispatch) => {
        dispatch({ type: "SEARCH_PROPERTIES_REQUEST" });

        const queryParams = queryString.stringify({ search: query });

        axios
            .get(`http://localhost:8000/properties/search?search=${queryParams}/`)
            .then((response) => {
                dispatch({ type: "SEARCH_PROPERTIES_SUCCESS", payload: response.data });
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || error.message;
                dispatch({ type: "SEARCH_PROPERTIES_FAILURE", payload: errorMessage });
            });
    };
};
// export const searchProperties = createAsyncThunk(
//     "search/properties",
//     async (query) => {
//         const response = await axios.get(
//             `http://localhost:8000/properties/search?q=${query}`
//         );
//         return response.data;
//     }
// );
