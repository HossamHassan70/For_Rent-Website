import { combineReducers } from 'redux';
import propertiesReducer from './fetchProperties';

const rootReducer = combineReducers({
  properties: propertiesReducer
});

export default rootReducer;