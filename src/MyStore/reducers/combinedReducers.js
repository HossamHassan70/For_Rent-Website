import {combineReducers} from 'redux';
import propertiesReducer from './fetchProperties';
import usersReducer from './fetchUsers';

const rootReducer = combineReducers({
  properties: propertiesReducer,
  users: usersReducer,
});

export default rootReducer;