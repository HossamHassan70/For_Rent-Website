import { combineReducers } from "redux";
import propertiesReducer from "./fetchProperties";
import searchReducer from "./searchReducer";
import reviewsReducer from "./reviews";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  properties: propertiesReducer,
  search: searchReducer,
  reviews: reviewsReducer,
  authReducer: authReducer,
});

export default rootReducer;
