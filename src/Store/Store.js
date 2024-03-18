import {CombinedStatucers,createStore } from "redux"
import CompineReducers from "./Reducers/CompineReducers"
import { composeWithDevTools } from "redux-devtools-extension";

const mystore = createStore(CompineReducers, composeWithDevTools())


export default mystore