import axios from "axios";
import queryString from 'query-string';

export const searchAction = ({ query, selectedBedroom, selectedBathroom, selectedPropertyType }) => {
    return (dispatch) => {
        dispatch({ type: "SEARCH_PROPERTIES_REQUEST" });

        const queryParams = queryString.stringify({
            title: query,
            rooms: selectedBedroom,
            bathrooms: selectedBathroom,
            type: selectedPropertyType,
        });

        axios
            .get(`http://localhost:8000/properties/search?${queryParams}`)
            .then((response) => {
                dispatch({ type: "SEARCH_PROPERTIES_SUCCESS", payload: response.data });
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || error.message;
                dispatch({ type: "SEARCH_PROPERTIES_FAILURE", payload: errorMessage });
            });
    };
};
