import {combineReducers} from 'redux';
import propertiesReducer from './fetchProperties';
import usersReducer from './fetchUsers';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  properties: propertiesReducer,
  users: usersReducer,
  search: searchReducer,
});

export default rootReducer;