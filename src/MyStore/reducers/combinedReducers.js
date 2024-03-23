import { combineReducers } from "redux";
import propertiesReducer from "./fetchProperties";
import usersReducer from "./fetchUsers";
import searchReducer from "./searchReducer";
import reviewsReducer from "./reviews";
import authReducer from "./authReducer";
import verifyReducer from './verify';

const rootReducer = combineReducers({
  properties: propertiesReducer,
  users: usersReducer,
  search: searchReducer,
  reviews: reviewsReducer,
  authReducer: authReducer,
  isVerified: verifyReducer,
});

export default rootReducer;
