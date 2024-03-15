import { combineReducers } from 'redux';
import propertiesReducer from './fetchProperties';
import usersReducer from './fetchUsers';
import searchReducer from './searchReducer';
import reviewsReducer from './reviews';

const rootReducer = combineReducers({
  properties: propertiesReducer,
  users: usersReducer,
  search: searchReducer,
  reviews: reviewsReducer,
});

export default rootReducer;